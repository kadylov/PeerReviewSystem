export class ReviewerMenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/reviewer/dashboard',
					translate: 'MENU.DASHBOARD',
				},

				{
					title: 'Assignments',
					root: true,
					alignment: 'left',
					page: '/reviewer/assignments',
					translate: 'MENU.DASHBOARD',
				},

				{
					title: 'Reviews',
					root: true,
					alignment: 'left',
					page: '/reviewer/reviews',
					translate: 'MENU.DASHBOARD',
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
					page: '/reviewer/dashboard',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Assignments', // <= Title of the page
					root: true,
					page: '/reviewer/assignments', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
