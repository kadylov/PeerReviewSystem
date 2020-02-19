export class ReviewerMenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards2',
					root: true,
					alignment: 'left',
					page: '/reviewer/dashboard',
					translate: 'MENU.DASHBOARD',
				},

				{
					title: 'Assignments2',
					root: true,
					alignment: 'left',
					page: '/reviewer/assignments',
				},

				{
					title: 'Reviews2',
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
					title: 'Dashboard2',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/reviewer/dashboard',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Assignments2', // <= Title of the page
					root: true,
					page: '/reviewer/assignments', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'Reviews2', // <= Title of the page
					root: true,
					page: '/reviewer/reviews', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
