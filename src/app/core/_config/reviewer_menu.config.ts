export class ReviewerMenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Current Assignments',
					root: true,
					alignment: 'left',
					page: '/reviewer/dashboard',
				},

				{
					title: 'Assignment History',
					root: true,
					alignment: 'left',
					page: '/reviewer/assignment_history',
				},

				{
					title: 'Reviews',
					root: true,
					alignment: 'left',
					page: '/reviewer/reviews',
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
