import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const ProctoringTracker = ({ apiUrl, batchInterval = 5000 }: any) => {
  const [metrics, setMetrics] = useState<any>({
    mouseMovements: [],
    keystrokes: [],
    clicks: [],
    tabSwitches: 0,
    idleTime: 0,
    lastActivity: Date.now()
  });

  const activityTimeout = useRef<any>(null);
  const eventHandlers = useRef<any>({});

  useEffect(() => {
    console.log('Live Behavioral Data:', metrics);
  }, [metrics]);

  const sendData = useCallback((data: any) => {
    console.log('Sending data:', data);
    axios
      .post(apiUrl, data)
      .then((response: any) => {
        console.log('Data sent successfully:', response.data);
      })
      .catch((error: any) => {
        console.error('Error sending data:', error);
      });
  }, [apiUrl]);

  const handleMouseMove = useCallback((e: any) => {
    console.log('Mouse move detected:', e.clientX, e.clientY);
    setMetrics((prev: any) => {
      const newMetrics = {
        ...prev,
        mouseMovements: [
          ...prev.mouseMovements,
          { x: e.clientX, y: e.clientY, timestamp: Date.now() }
        ],
        lastActivity: Date.now(),
        idleTime: 0
      };
      sendData(newMetrics);
      return newMetrics;
    });
  }, [sendData]);

  const handleClick = useCallback((e: any) => {
    console.log('Click detected:', e.clientX, e.clientY);
    setMetrics((prev: any) => {
      const newMetrics = {
        ...prev,
        clicks: [
          ...prev.clicks,
          { x: e.clientX, y: e.clientY, timestamp: Date.now() }
        ],
        lastActivity: Date.now(),
        idleTime: 0
      };
      sendData(newMetrics);
      return newMetrics;
    });
  }, [sendData]);

  const handleKeyDown = useCallback((e: any) => {
    const target = e.target as any;
    if (target instanceof HTMLInputElement && ['password', 'email', 'tel'].includes(target.type))
      return;

    console.log('Key down detected:', e.key);
    setMetrics((prev: any) => {
      const newMetrics = {
        ...prev,
        keystrokes: [
          ...prev.keystrokes,
          { key: e.key, timestamp: Date.now() }
        ],
        lastActivity: Date.now(),
        idleTime: 0
      };
      sendData(newMetrics);
      return newMetrics;
    });
  }, [sendData]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      console.log('Tab switch detected');
      setMetrics((prev: any) => {
        const newMetrics = {
          ...prev,
          tabSwitches: prev.tabSwitches + 1
        };
        sendData(newMetrics);
        return newMetrics;
      });
    }
  }, [sendData]);

  const throttle = useCallback((func: any, limit: any) => {
    let lastFunc: any;
    let lastRan: any;
    return function (...args: any) {
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

    console.log('Adding event listeners');
    window.addEventListener('mousemove', eventHandlers.current.mouseMove);
    window.addEventListener('click', eventHandlers.current.click);
    window.addEventListener('keydown', eventHandlers.current.keyDown);
    document.addEventListener('visibilitychange', eventHandlers.current.visibilityChange);
  }, [handleMouseMove, handleClick, handleKeyDown, handleVisibilityChange, throttle]);

  const startIdleDetection = useCallback(() => {
    console.log('Starting idle detection');
    activityTimeout.current = setInterval(() => {
      setMetrics((prev: any) => {
        const idleSeconds = Math.floor((Date.now() - prev.lastActivity) / 1000);
        if (idleSeconds > prev.idleTime) {
          return { ...prev, idleTime: idleSeconds };
        }
        return prev;
      });
    }, 1000);
  }, []);

  const startTracking = useCallback(() => {
    console.log('Setting up event listeners and starting idle detection');
    setupEventListeners();
    startIdleDetection();
  }, [setupEventListeners, startIdleDetection]);

  const cleanupResources = useCallback(() => {
    console.log('Cleaning up resources');
    if (activityTimeout.current) {
      clearInterval(activityTimeout.current);
    }
    if (eventHandlers.current) {
      window.removeEventListener('mousemove', eventHandlers.current.mouseMove);
      window.removeEventListener('click', eventHandlers.current.click);
      window.removeEventListener('keydown', eventHandlers.current.keyDown);
      document.removeEventListener('visibilitychange', eventHandlers.current.visibilityChange);
    }
  }, []);

  useEffect(() => {
    console.log('Component mounted, starting tracking');
    startTracking();

    return () => {
      console.log('Component unmounted, cleaning up resources');
      cleanupResources();
    };
  }, [startTracking, cleanupResources]);

  return null; // This component does not render visible content
};

export default ProctoringTracker;
