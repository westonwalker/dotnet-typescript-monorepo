import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { UserClient, User } from "../api/client";

export const Route = createFileRoute("/users")({
	component: UsersComponent,
});

const userClient = new UserClient();

const useUserQuery = () => {
	return useQuery<User[], Error>({
		queryKey: ["users"],
		queryFn: () => userClient.get(),
	});
};

function UsersComponent() {
	const { isPending, error, data, isFetching } = useUserQuery();

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="p-2">
			<h3 className="text-blue-500 font-bold">Users</h3>
			{data.map((item, index) => (
				<div className="py-4" key={index}>
					<p>{item.name}</p>
				</div>
			))}
			<div>{isFetching ? "Updating..." : ""}</div>
		</div>
	);
}
