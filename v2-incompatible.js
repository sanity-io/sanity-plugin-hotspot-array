import {showIncompatiblePluginDialog} from '@sanity/incompatible-plugin'

import {name, sanityExchangeUrl, version} from './package.json'

export default showIncompatiblePluginDialog({
  name: name,
  versions: {
    v3: version,
    v2: '^0.0.10',
  },
  sanityExchangeUrl,
})
