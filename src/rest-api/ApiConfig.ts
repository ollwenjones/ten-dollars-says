const DEFAULT_ROOT = "../decisions/Primary/";

export const ApiConfig = {
  loadConfig() {
    fetch(`./rest-config.json`)
      .then(value =>
        value
          .json()
          .then(json => (this.restRoot = json.restRoot))
          .catch(logRootConfigLoadError)
      )
      .catch(logRootConfigLoadError);
  },
  restRoot: DEFAULT_ROOT
};

function logRootConfigLoadError(reason: any) {
  // tslint:disable-next-line:no-console
  console.error("failed to load rest-root", reason);
}
