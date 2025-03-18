import React from "react";

function Payroll() {
  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Job Role
              </th>
              <th scope="col" class="px-6 py-3">
                Salary
              </th>
              <th scope="col" class="px-6 py-3">
                Payroll
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 p-2">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Aditya Kale
              </th>
              <td class="px-6 py-4">Software Developer</td>
              <td class="px-6 py-4">50000</td>
              <td class="px-6 py-4">
                <button className="bg-blue-600 rounded-lg border border-gray-900 hover:border hover:border-white p-2 text-white">
                  Payment
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;
