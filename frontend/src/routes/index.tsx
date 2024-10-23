import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { WeatherForecastClient, WeatherForecast } from "../api/client";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

const weatherClient = new WeatherForecastClient();

const useWeatherQuery = () => {
	return useQuery<WeatherForecast[], Error>({
		queryKey: ["weather"],
		queryFn: () => weatherClient.get(),
	});
};

function HomeComponent() {
	const { isPending, error, data, isFetching } = useWeatherQuery();

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="p-2">
			<h3 className="text-blue-500 font-bold">Weather</h3>
			{data.map((item, index) => (
				<div className="py-4" key={index}>
					<p>{item.summary}</p>
					<p>{item.date ? item.date.toLocaleDateString() : ""}</p>
					<p>{item.temperatureF}</p>
				</div>
			))}
			<div>{isFetching ? "Updating..." : ""}</div>
		</div>
	);
}
