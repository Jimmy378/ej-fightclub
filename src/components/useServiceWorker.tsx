import React, { useState, useEffect } from 'react';
import * as serviceWorker from '../util/serviceWorker';

const useServiceWorker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingServiceWorker, setWaitingServiceWorker] = useState<ServiceWorker>();

  useEffect(() => {
    serviceWorker.register({
      onUpdate: async (reg) => {
        if (reg.waiting) {
          setWaitingServiceWorker(reg.waiting);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (waitingServiceWorker) {
      setUpdateAvailable(true);
    }
  }, [waitingServiceWorker]);

  const triggerUpdate = () => {
    if (updateAvailable && waitingServiceWorker) {
      waitingServiceWorker.onstatechange = () => {
        if (waitingServiceWorker.state === 'activated') {
          window.location.reload();
        }
      };
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return {
    updateAvailable: updateAvailable,
    triggerUpdate: triggerUpdate,
  };
};

export default useServiceWorker;
