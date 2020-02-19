export class ReviewerPageConfig {
	public defaults: any = {
		dashboard: {
			page: {
				'title': 'Dashboard2',
				'desc': 'Latest updates and statistic charts'
			},
		},
		header: {
			actions: {
				page: {title: 'Actions2', desc: 'Actions example page'}
			}
		},
		profile: {
			page: {title: 'User Profile2', desc: ''}
		},
		error: {
			404: {
				page: {title: '404 Not Found', desc: '', subheader: false}
			},
			403: {
				page: {title: '403 Access Forbidden', desc: '', subheader: false}
			}
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
