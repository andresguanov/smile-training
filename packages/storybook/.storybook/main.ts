module.exports = {
    stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/vue3',
    core: {
        builder: 'storybook-builder-vite',
    },
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.vue$/,
            loader: 'vue-docgen-loader',
            enforce: 'post',
        })
        return config
    },
}
