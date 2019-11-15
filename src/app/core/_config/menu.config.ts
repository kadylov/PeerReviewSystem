export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Reviews',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Preliminary',
							bullet: 'dot',
							icon: 'flaticon-interface-7',

						},
						{
							title: 'In-Progress',
							bullet: 'dot',
							icon: 'flaticon-web',

						},
						{
							title: 'Completed',
							bullet: 'dot',
							icon: 'flaticon-web',

						},
					]
				},
				{
					title: 'Members',
					root: true,
					alignment: 'left',
					toggle: 'click',
				},
				{
					title: 'The Results',
					root: true,
					alignment: 'left',
					toggle: 'click',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Incoming Works', // <= Title of the page
					root: true,
					page: '/incoming-work', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'Assignments', // <= Title of the page
					root: true,
					page: '/assignment', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'In-Progress', // <= Title of the page
					root: true,
					page: '/in-progress', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'Completed Reviews', // <= Title of the page
					root: true,
					page: '/result', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				// {
				// 	title: 'Layout Builder',
				// 	root: true,
				// 	icon: 'flaticon2-expand',
				// 	page: '/builder'
				// },
				// {section: 'Reviews'},
				// {
				// 	title: 'Preliminary',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-browser-2',
				// },
				// {
				// 	title: 'In-Progress',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-digital-marketing',
				//
				// },
				// {
				// 	title: 'Completed',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-digital-marketing',
				//
				// },
				{section: 'Members'},
				// {
				// 	title: 'Members',
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-list-2',
				// 	root: true,
				// 	permission: 'accessToECommerceModule',
				// },
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Users',
							page: '/user-management/users'
						},
						{
							title: 'Roles',
							page: '/user-management/roles'
						}
					]
				},
				// {section: 'Custom'},
				// {
				// 	title: 'Error Pages',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-list-2',
				// 	submenu: [
				// 		{
				// 			title: 'Error 1',
				// 			page: '/error/error-v1'
				// 		},
				// 		{
				// 			title: 'Error 2',
				// 			page: '/error/error-v2'
				// 		},
				// 		{
				// 			title: 'Error 3',
				// 			page: '/error/error-v3'
				// 		},
				// 		{
				// 			title: 'Error 4',
				// 			page: '/error/error-v4'
				// 		},
				// 		{
				// 			title: 'Error 5',
				// 			page: '/error/error-v5'
				// 		},
				// 		{
				// 			title: 'Error 6',
				// 			page: '/error/error-v6'
				// 		},
				// 	]
				// },
				// {
				// 	title: 'Wizard',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-mail-1',
				// 	submenu: [
				// 		{
				// 			title: 'Wizard 1',
				// 			page: '/wizard/wizard-1'
				// 		},
				// 		{
				// 			title: 'Wizard 2',
				// 			page: '/wizard/wizard-2'
				// 		},
				// 		{
				// 			title: 'Wizard 3',
				// 			page: '/wizard/wizard-3'
				// 		},
				// 		{
				// 			title: 'Wizard 4',
				// 			page: '/wizard/wizard-4'
				// 		},
				// 	]
				// },
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
