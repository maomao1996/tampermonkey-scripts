import { createRollupConfig } from '@femm/shared-rollup-config'

import pkg from './package.json' assert { type: 'json' }

export default createRollupConfig({ pkg })
