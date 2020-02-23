export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/admin/dashboard',
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
					page: '/admin/dashboard',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Incoming Works', // <= Title of the page
					root: true,
					page: '/admin/incoming-work', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'Assignments', // <= Title of the page
					root: true,
					page: '/admin/assignment', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'In-Progress', // <= Title of the page
					root: true,
					page: '/admin/in-progress', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'Completed Reviews', // <= Title of the page
					root: true,
					page: '/admin/result', // <= URL
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
							page: '/admin/user-management/users'
						},
						// {
						// 	title: 'Roles',
						// 	page: '/admin/user-management/roles'
						// }
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
