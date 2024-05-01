import {BarList, Card} from "@tremor/react";
import {ChartTypeProps, CitiesType} from "@/lib/types";


const CitiesChart = ({jobs}: ChartTypeProps) => {


    const formattedCities: CitiesType[] = jobs.map((item) => ({
        id: item.id,
        status: item.status,
        location: item.location ? item.location : 'No info'
    }))


    const countByCities = formattedCities.reduce<{ name: string, value: number }[]>((acc, city) => {

        let cityEntry = acc.find(cityInAcc => cityInAcc.name === city.location)

        if (!cityEntry) {
            acc.push({name: city.location as string, value: 1})
        } else {
            cityEntry.value++
        }

        return acc

    }, [])


    return (
        <Card className="mx-auto max-w-lg">
            <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Cities
                by resume Analytics</h3>
            <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
                <span>City</span>
                <span>How many applied</span>
            </p>
            <BarList data={countByCities} className="mt-2"/>
        </Card>

    );
};

export default CitiesChart;