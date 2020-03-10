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
					title: 'Assignment History', // <= Title of the page
					root: true,
					page: '/reviewer/assignment_history', // <= URL
					icon: 'flaticon-line-graph' // <= Choose the icon class
				},
				{
					title: 'Reviews', // <= Title of the page
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
