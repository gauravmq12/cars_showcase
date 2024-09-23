"use client";

import { useEffect, useState } from 'react';

import { CarCard ,CustomFilter, Hero, SearchBar, ShowMore } from '@/components/index';
import { fetchCars } from '@/utils/index';
import { fuels, yearsOfProduction } from '@/constants/index';
import Image from '@/node_modules/next/image';


export default function Home() {
  const [allCars, setallCars] = useState([]);
  const [loading, setloading] = useState(false);

  // search states
  const [manufacturer, setmanufacturer] = useState("");
  const [model, setmodel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // pagination state
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setloading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
  
    setallCars(result);
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false);
    }
  }
  useEffect(() => {
    console.log(fuel, year, limit, manufacturer, model)
    getCars();
  }, [fuel, year, limit, manufacturer, model])

  const isDataEmpty = !Array.isArray(allCars) || allCars.
  length < 1 || !allCars;

  return (
      <main className="overflow-hidden">
        <Hero />

        <div className="mt-12 padding-x 
        padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">
              Car Catalogue</h1>
              <p>Explore the cars you might like</p>
          </div>

          <div className="home__filters">
            <SearchBar setManufacturer={setManufacturer} 
            setModel={setModel} />

            <div className="home__filter-container">
              <CustomFilter title="fuel" options={fuels}
              setFilter={setFuel} />
              <CustomFilter title="year" options={yearsOfProduction}
              setFilter={setYear} />
            </div>
          </div>

          {allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                <CarCard car={car} />
                ))}
              </div>

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image
                    src="/loader.svg"
                    alt="loader"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}

              <ShowMore 
                pageNumber={limit / 10}
                isNext={limit > allCars.length}
                setlimit={setLimit}
              />
            </section>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )}

        </div>
       </main>
  )
}

