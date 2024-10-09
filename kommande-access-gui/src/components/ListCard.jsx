/**
 * @file        ListCard.js
 * @brief       Product List Component for displaying a grid of product cards.
 * @details     This component fetches a list of products from a JSON file and displays each product in a responsive grid using the Card component.
 *              The grid layout dynamically adjusts based on screen size, allowing up to five columns on larger screens.
 * @returns     {JSX.Element} - A grid of Card components representing products with their details.
 *****************************************************************
 * @component Details
 * - Uses `useState` to store product data and `useEffect` to fetch data from a local JSON file on component mount.
 * - Displays each product in a responsive grid layout that adapts to various screen sizes (from 1 to 5 columns).
 * - Handles fetch errors gracefully by logging them to the console.
 *****************************************************************
 * @attention
 * Development Environment: macOS Sequoia 15.0 (24A335)
 * @par Modification Log:
 * <table>
 * <tr><th>Date        <th>Version  <th>Author    <th>Description
 * <tr><td>2024/10/04  <td>1.0      <td>Ao XIE    <td>Created initial version with data fetching and responsive grid layout for product display
 * </table>
 ******************************************************************
 */

import Card from "@/components/Card";

export default function ListCard({ type, products }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4 sm:p-6 lg:p-8">
            {products.map((product, index) => {
                // 在这里进行条件判断
                if (type === "all" || product.type === type) {
                    return (
                        <Card
                            key={index}
                            serialNumber={product.serialNumber}
                            productName={product.productName}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                            brand={product.brand}
                        />
                    );
                }
                return null; // 如果条件不满足，返回 null
            })}
        </div>
    );
}
