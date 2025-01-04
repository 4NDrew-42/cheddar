import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
	resolve: (specifier, context, defaultResolver) => {
		const aliasMap = {
			'@lib': './src/lib',
			'@models': './src/models',
		};

		const alias = Object.keys(aliasMap).find((key) => specifier.startsWith(key));

		if (alias) {
			const newSpecifier = specifier.replace(alias, aliasMap[alias]);
			return defaultResolver(newSpecifier, context);
		}

		return defaultResolver(specifier, context);
	},
};
