import loadable from "react-loadable";

const cache = {
  js: {},
  css: {}
};

const loadJS = (url, clientName) => {
  if (!cache.js[url]) {
    console.debug(`[client-hub] Loading ${clientName} js...`);
    cache.js[url] = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.onerror = () => {
        reject(new Error(`[client-hub] Failed to load ${clientName} js`));
      };
      script.onload = () => {
        console.debug(`[client-hub] ${clientName} js loaded`);
        resolve();
      };
      script.async = true;
      script.src = url;
      script.type = "module";
      document.body.appendChild(script);
    });
  }
  return cache.js[url].then(() => window[clientName].default);
};

const loadCSS = (url, clientName) => {
  if (!cache.css[url]) {
    console.debug(`[client-hub] Loading ${clientName} css...`);
    cache.css[url] = new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.onerror = () => {
        reject(new Error(`[client-hub] Failed to load ${clientName} css`));
      };
      link.onload = () => {
        console.debug(`[client-hub] ${clientName} css loaded`);
        resolve();
      };
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;
      document.head.appendChild(link);
    });
  }
  return cache.css[url];
};

const loadBundle = ({ clientName, bundleHost }) => {
  let promiseChain = Promise.resolve();

  // In development, CRA does not produce a separate CSS file
  //if (process.env.NODE_ENV !== "development") {
  promiseChain = promiseChain.then(() =>
    loadCSS(`${bundleHost}/main.css`, clientName)
  );
  //}

  promiseChain = promiseChain.then(() =>
    loadJS(`${bundleHost}/main.js`, clientName)
  );

  return promiseChain;
};

const MicroClient = ({ clientName, bundleHost, ...rest }) => {
  const LoadableClient = loadable({
    loader: () => loadBundle({ clientName, bundleHost }),
    loading: () => <div>Loading...</div>
  });

  return <LoadableClient {...rest} />;
};

export default MicroClient;
