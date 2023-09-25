import { Fragment } from 'react';
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

type Element = () => JSX.Element;

interface K5K5SystemRoutesProps { }

interface Module {
    default: Element
}

const PRESERVED = import.meta.glob<Module>('/src/pages/(_index|Login).tsx', { eager: true });
const ROUTES = import.meta.glob<Module>('/src/pages/**/[a-z[]*.tsx', { eager: true });

console.log(PRESERVED, ROUTES)

const preservedRoutes: Partial<Record<string, Element>> = Object.keys(PRESERVED).reduce(
    (routes, key) => {
        const path = key.replace(/\/src\/pages\/|\.tsx$/g, '');
        return { ...routes, [path]: PRESERVED[key]?.default };
    },
    {}
);

const Index = preservedRoutes?.['_index'] || Fragment;
const Login = preservedRoutes?.['Login'] || Fragment;

const router = createHashRouter([
    {
        path: '/',
        element: <Index />,
        children: Object.keys(ROUTES).reduce<RouteObject[]>(
            (routes, key) => {
                const module = ROUTES[key];

                const route: RouteObject = {
                    element: <module.default />,
                };

                const segments = key
                    .replace(/\/src\/pages|\.tsx$/g, '')
                    .replace(/\[\.{3}.+\]/, '*')
                    .replace(/\[([^\]]+)\]/g, ':$1')
                    .split('/')
                    .filter(Boolean);

                segments.reduce((parent, segment, index) => {
                    const path = segment.replace(/index|\./g, '');
                    const root = index === 0;
                    const leaf = index === segments.length - 1 && segments.length > 1;
                    const node = !root && !leaf;
                    const insert = /^\w|\//.test(path) ? 'unshift' : 'push';

                    if (root) {
                        const dynamic = path.startsWith(':') || path === '*';
                        if (dynamic) return parent;

                        const last = segments.length === 1;
                        if (last) {
                            routes.push({ path, ...route });
                            return parent;
                        }
                    }

                    if (root || node) {
                        const current = root ? routes : parent.children;
                        const found = current?.find(route => route.path === path);
                        if (found) found.children ??= [];
                        else current?.[insert]({ path, children: [] });
                        return (
                            found || (current?.[insert === 'unshift' ? 0 : current.length - 1] as RouteObject)
                        );
                    }

                    if (leaf) {
                        parent?.children?.[insert]({ path, ...route });
                    }

                    return parent;
                }, {} as RouteObject);

                console.log(routes)

                return routes;
            },
            []
        ),
    },
    { path: '/login', element: <Login /> }
]);

const K5K5SystemRoutes = (_props: K5K5SystemRoutesProps) => (<RouterProvider router={router} />);

export default K5K5SystemRoutes;