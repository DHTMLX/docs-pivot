module.exports = {
    docs: [
        {
            type: "doc",
            id: "index"
        },
        {
            type: "doc",
            id: "how-to-start"
        },
            /*{
                type: "category",
                label: "What's new and migration",
                collapsible: true,
                collapsed: true,
                link: {
                    type: "generated-index",
                    title: "What's new and migration",
                    //slug: '/category/docusaurus-guides',
                    keywords: ['news'],
                    image: "/img/docusaurus.png",
                },
                items: [
                    'news/whats_new',
                    'news/migration'
                ]
            },*/
        {
            type: 'doc',
            id: 'news/whats_new'
        },
        {
            type: "category",
            label: "API",
            collapsible: true,
            collapsed: false,
            link: {
                type: "doc",
                id: "api/overview/main-overview"
            },
            items: [
                //"api/overview/main-overview",
                // JS Pivot methods
                {
                    type: "category",
                    label: "Pivot methods",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: "doc",
                        id: "api/overview/methods-overview"
                    },
                    items: [
                        // A
                        "api/methods/gettable-method",
                        "api/methods/setconfig-method",
                        "api/methods/setlocale-method",
                        "api/methods/showconfigpanel-method",
                    ]
                },
                // JS Pivot internal methods
                {
                    type: "category",
                    label: "Pivot internal API",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: "generated-index",
                        title: 'Internal API overview',
                        keywords: ['internal api'],
                        image: "/img/docusaurus.png",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Event Bus methods",
                            collapsible: true,
                            collapsed: true,
                            link: {
                                type: "doc",
                                id: "api/overview/internal-eventbus-overview"
                            },
                            items: [
                                "api/internal/detach-method",
                                "api/internal/exec-method",
                                "api/internal/intercept-method",
                                "api/internal/on-method",
                                "api/internal/setnext-method"
                            ]
                        },
                        {
                            type: "category",
                            label: "State methods",
                            collapsible: true,
                            collapsed: true,
                            link: {
                                type: "doc",
                                id: "api/overview/internal-state-overview"
                            },
                            items: [
                                "api/internal/getreactivestate-method",
                                "api/internal/getstate-method",
                                "api/internal/getstores-method"
                            ]
                        },
                    ]
                },
                {
                    type: "category",
                    label: "Pivot events",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: "doc",
                        id: "api/overview/events-overview"
                    },
                    items: [
                        "api/events/add-field-event",
                        "api/events/apply-filter-event",
                        
                        "api/events/delete-field-event",
                        "api/events/open-filter-event",
                        "api/events/render-table-event",
                        "api/events/reorder-fields-event",
                        "api/events/show-config-panel-event",
                        "api/events/update-config-event",
                        "api/events/update-value-event"   
                    ]
                },
                {
                    type: "category",
                    label: "Pivot properties",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: "doc",
                        id: "api/overview/properties-overview"
                    },
                    items: [
                        // JS Pivot
                        "api/config/columnshape-property",
                        "api/config/config-property",
                        "api/config/configpanel-property",
                        "api/config/data-property",
                        "api/config/fields-property",
                        "api/config/headershape-property",
                        "api/config/limits-property",
                        "api/config/locale-property",
                        "api/config/methods-property",
                        "api/config/predicates-property",
                        "api/config/readonly-property",
                        "api/config/tableshape-property"
                    ]
                }
            ]
        },
        {
            type: "category",
            label: "Guides",
            collapsible: true,
            collapsed: true,
            link: {
                type: "generated-index",
                title: 'Guides',
                keywords: ['guides'],
                image: "/img/docusaurus.png",
            },
            items: [
                "guides/initialization",
                "guides/configuration",
                "guides/customization",
                "guides/loading-exporting-data",
                "guides/localization",
                "guides/stylization",
                "guides/typescript-support",
                "guides/working-with-data",
                
            ]
        }
    ]
};
