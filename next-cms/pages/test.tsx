import { LendingDTO } from '@/api/dto/lending.dto';
import { LendingAPI } from '@/api/lending.api';
import React, { useEffect, useState } from 'react';

const Test = () => {
	const [sites, setSites] = useState<LendingDTO[]>([]);

	useEffect(() => {
		async function fetchAll() {
			const resp = await LendingAPI.getAllForCurrentUser(2);
			setSites(resp);
		}
		fetchAll();
	}, []);
	return (
		<div>
			<ul>
				{sites.map((site) => {
					return <li>{site.id}</li>;
				})}
			</ul>
		</div>
	);
};

export default Test;
