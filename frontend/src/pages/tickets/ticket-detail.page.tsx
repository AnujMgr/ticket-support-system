import { Fragment } from "react/jsx-runtime"
import { useParams } from "react-router-dom";

import { STATUS } from "@/lib/constants";
import { useGetTicketQuery } from "@/redux/features/tickets/ticketsApiSlice";

function TicketDetailPage() {
  const id = useParams().id ?? '';
  const { data, isLoading } = useGetTicketQuery(id, {});

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Missing post!</div>

  return (
    <Fragment>
      {
        isLoading ? <div>Loading...</div> :
          <Fragment>
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {data.subject}
              </h3>
              <p className="max-w-2xl mt-1 text-gray-500 dark:text-gray-400 text-sm/6">
                {data.description}
              </p>
            </div>

            <div className="mt-4 border-t border-gray-100 dark:border-gray-700">
              <dl className="divide-y divide-gray-100 dark:divide-gray-700">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="font-medium text-gray-900 text-sm/6 dark:text-gray-200">Status</dt>
                  <dd className="mt-1 text-gray-700 text-sm/6 dark:text-gray-300 sm:col-span-2 sm:mt-0">
                    {STATUS[data.status]}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="font-medium text-gray-900 text-sm/6 dark:text-gray-200">Attchment</dt>
                  <dd className="mt-1 text-gray-700 text-sm/6 dark:text-gray-300 sm:col-span-2 sm:mt-0">
                    {
                      data.attachment ? <img src={data.attachment} alt="" /> : 'No attachment'
                    }
                  </dd>
                </div>
              </dl>
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default TicketDetailPage