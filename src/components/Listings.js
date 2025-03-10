import { Fragment, useContext } from "react";
import { ga, languageColor, skeleton } from "../helpers/utils";
import config from "../config";
import { LoadingContext } from "../contexts/LoadingContext";

const Listings = () => {
    const [loading] = useContext(LoadingContext);

    const renderSkeleton = () => {
        let array = [];
        for (let index = 0; index < config.github.limit; index++) {
            array.push((
                <div className="card shadow-lg compact bg-base-100" key={index}>
                    <div className="flex justify-between flex-col p-8 h-full w-full">
                        <div>
                            <div className="flex items-center">
                                <span>
                                    <h5 className="card-title text-lg">
                                        {skeleton({ width: 'w-32', height: 'h-8' })}
                                    </h5>
                                </span>
                            </div>
                            <div className="mb-5 mt-1">
                                {skeleton({ width: 'w-full', height: 'h-4', className: 'mb-2' })}
                                {skeleton({ width: 'w-full', height: 'h-4' })}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-grow">
                                <span className="mr-3 flex items-center">
                                    {skeleton({ width: 'w-12', height: 'h-4' })}
                                </span>
                                <span className="flex items-center">
                                    {skeleton({ width: 'w-12', height: 'h-4' })}
                                </span>
                            </div>
                            <div>
                                <span className="flex items-center">
                                    {skeleton({ width: 'w-12', height: 'h-4' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }

        return array;
    }

    const renderProjects = () => {
        return config.listings.map((item, index) => (
            <div
                className="card shadow-lg compact bg-base-100 cursor-pointer"
                key={index}
                onClick={() => {
                    try {
                        if (config.googleAnalytics?.id) {
                            ga.event({
                                action: "Click project",
                                params: {
                                    project: item.name
                                }
                            });
                        }
                    } catch (error) {
                        console.error(error);
                    }

                    window.location.href = item.path;
                }}
            >
                <div className="flex justify-between flex-col p-8 h-full w-full">
                    <div>
                        <div className="flex items-center opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            <span>
                                <h5 className="card-title text-lg">
                                    {item.name}
                                </h5>
                            </span>
                        </div>
                        <p className="mb-5 mt-1 text-base-content text-opacity-60 text-sm">
                            {item.description}
                        </p>
                    </div>
                    <div className="flex justify-between text-sm text-base-content text-opacity-60">
                        <div>
                            <span className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-1 opacity-60" style={{ backgroundColor: languageColor(item.language) }} />
                                <span>{item.language}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <Fragment>
            <div className="col-span-1 lg:col-span-2">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <div className="card compact bg-base-100 shadow-sm">
                            <div className="card-body">
                                <ul className="menu row-span-3 bg-base-100 text-base-content">
                                    <li>
                                        <div className="pb-0-important mx-4 flex items-center justify-between">
                                            <h5 className="card-title">
                                                {
                                                    loading ? skeleton({ width: 'w-28', height: 'h-8' }) : (
                                                        <span className="opacity-70">Other Projects</span>
                                                    )
                                                }
                                            </h5>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(loading || !config.listings) ? renderSkeleton() : renderProjects()}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Listings;