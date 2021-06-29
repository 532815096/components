const routes = [
    {
        path: '/',
        component: () => import('@/views/demo/index.vue'),
        meta: {
            title: '自定义',
        },
    },
];

export default routes;
