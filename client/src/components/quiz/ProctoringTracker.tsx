import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

interface ProctoringMetrics {
  mouseMovements: Array<{ x: number; y: number; timestamp: number }>;
  keystrokes: Array<{ key: string; timestamp: number }>;
  clicks: Array<{ x: number; y: number; timestamp: number }>;
  tabSwitches: number;
  idleTime: number;
  lastActivity: number;
}

interface ProctoringTrackerProps {
  apiUrl: string;
  isQuizActive: boolean;
  onQuizEnd?: (result: string) => void;
  batchInterval?: number;
}

const ProctoringTracker: React.FC<ProctoringTrackerProps> = ({ 
  apiUrl, 
  isQuizActive, 
  onQuizEnd, 
  batchInterval = 5000 
}) => {
  const [metrics, setMetrics] = useState<ProctoringMetrics>({
    mouseMovements: [],
    keystrokes: [],
    clicks: [],
    tabSwitches: 0,
    idleTime: 0,
    lastActivity: Date.now()
  });

  const activityTimeout = useRef<NodeJS.Timeout | null>(null);
  const eventHandlers = useRef<any>({});

  // Calculate feature vector from metrics
  const calculateFeatures = useCallback(() => {
    // Calculate typing speed (keystrokes per minute)
    let typingSpeed = 0;
    if (metrics.keystrokes.length > 1) {
      const timeSpan = metrics.keystrokes[metrics.keystrokes.length - 1].timestamp - metrics.keystrokes[0].timestamp;
      // Avoid division by zero and convert to keystrokes per minute
      if (timeSpan > 0) {
        typingSpeed = Math.round((metrics.keystrokes.length / (timeSpan / 1000)) * 60);
      }
    }
    
    return {
      features: [
        metrics.tabSwitches,                 // Number of tab switches
        metrics.idleTime,                    // Idle time in seconds
        metrics.mouseMovements.length,       // Amount of mouse movement
        metrics.clicks.length,               // Number of clicks
        typingSpeed                          // Typing speed (keystrokes per minute)
      ]
    };
  }, [metrics]);

  // Send data to ML model when quiz ends
  const sendDataToModel = useCallback(async () => {
    try {
      const featureData = calculateFeatures();
      console.log('Sending final data to ML model:', featureData);
      
      const response = await axios.post('http://127.0.0.1:5000/predict', featureData);
      console.log('ML model response:', response.data);
      
      // Extract the prediction result (expecting "low", "medium", or "high")
      const result = response.data.result || response.data.prediction || JSON.stringify(response.data);
      
      // Notify parent component about the result if callback provided
      if (onQuizEnd) {
        onQuizEnd(result);
      }
    } catch (error) {
      console.error('Error sending data to ML model:', error);
      // Notify parent of error
      if (onQuizEnd) {
        onQuizEnd('Error: Could not get prediction');
      }
    }
  }, [calculateFeatures, onQuizEnd]);

  // Check if quiz has ended and process data
  useEffect(() => {
    // When quiz changes from active to inactive, and we have data, send to model
    if (isQuizActive === false && metrics.mouseMovements.length > 0) {
      sendDataToModel();
    }
  }, [isQuizActive, metrics, sendDataToModel]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isQuizActive) return;
    
    setMetrics((prev) => ({
      ...prev,
      mouseMovements: [
        ...prev.mouseMovements,
        { x: e.clientX, y: e.clientY, timestamp: Date.now() }
      ],
      lastActivity: Date.now(),
      idleTime: 0
    }));
  }, [isQuizActive]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!isQuizActive) return;
    
    setMetrics((prev) => ({
      ...prev,
      clicks: [
        ...prev.clicks,
        { x: e.clientX, y: e.clientY, timestamp: Date.now() }
      ],
      lastActivity: Date.now(),
      idleTime: 0
    }));
  }, [isQuizActive]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isQuizActive) return;
    
    const target = e.target as HTMLElement;
    if (target instanceof HTMLInputElement && ['password', 'email', 'tel'].includes(target.type))
      return;

    setMetrics((prev) => ({
      ...prev,
      keystrokes: [
        ...prev.keystrokes,
        { key: e.key, timestamp: Date.now() }
      ],
      lastActivity: Date.now(),
      idleTime: 0
    }));
  }, [isQuizActive]);

  const handleVisibilityChange = useCallback(() => {
    if (!isQuizActive) return;
    
    if (document.hidden) {
      setMetrics((prev) => ({
        ...prev,
        tabSwitches: prev.tabSwitches + 1
      }));
    }
  }, [isQuizActive]);

  const throttle = useCallback((func: Function, limit: number) => {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    
    return function(this: any, ...args: any[]) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }, []);

  const setupEventListeners = useCallback(() => {
    eventHandlers.current = {
      mouseMove: throttle(handleMouseMove, 100),
      click: handleClick,
      keyDown: handleKeyDown,
      visibilityChange: handleVisibilityChange
    };

    console.log('Adding proctoring event listeners');
    window.addEventListener('mousemove', eventHandlers.current.mouseMove);
    window.addEventListener('click', eventHandlers.current.click);
    window.addEventListener('keydown', eventHandlers.current.keyDown);
    document.addEventListener('visibilitychange', eventHandlers.current.visibilityChange);
  }, [handleMouseMove, handleClick, handleKeyDown, handleVisibilityChange, throttle]);

  const startIdleDetection = useCallback(() => {
    console.log('Starting idle detection');
    activityTimeout.current = setInterval(() => {
      setMetrics((prev) => {
        const idleSeconds = Math.floor((Date.now() - prev.lastActivity) / 1000);
        if (idleSeconds > prev.idleTime) {
          return { ...prev, idleTime: idleSeconds };
        }
        return prev;
      });
    }, 1000);
  }, []);

  const cleanupResources = useCallback(() => {
    console.log('Cleaning up proctoring resources');
    if (activityTimeout.current) {
      clearInterval(activityTimeout.current);
      activityTimeout.current = null;
    }
    
    if (eventHandlers.current) {
      window.removeEventListener('mousemove', eventHandlers.current.mouseMove);
      window.removeEventListener('click', eventHandlers.current.click);
      window.removeEventListener('keydown', eventHandlers.current.keyDown);
      document.removeEventListener('visibilitychange', eventHandlers.current.visibilityChange);
    }
  }, []);

  useEffect(() => {
    if (isQuizActive) {
      console.log('Quiz active - starting proctoring');
      setMetrics({
        mouseMovements: [],
        keystrokes: [],
        clicks: [],
        tabSwitches: 0,
        idleTime: 0,
        lastActivity: Date.now()
      });
      
      setupEventListeners();
      startIdleDetection();
    } else {
      console.log('Quiz inactive - cleaning up proctoring');
      cleanupResources();
    }

    return () => {
      cleanupResources();
    };
  }, [isQuizActive, setupEventListeners, startIdleDetection, cleanupResources]);

  return null;
};

export default ProctoringTracker;