/**
 * @file        Footer.js
 * @brief       Footer Component for displaying copyright information.
 * @details     This component displays a footer at the bottom of the page with the current year and a copyright notice.
 *              The layout is styled to be aligned to the left with padding and background styling for visual consistency.
 * @returns     {JSX.Element} - A styled footer component displaying copyright information.
 *****************************************************************
 * @component Details
 * - Dynamically updates the year using JavaScript’s Date object.
 * - Utilizes Tailwind CSS classes for background and text styling, and alignment.
 *****************************************************************
 * @attention
 * Development Environment: macOS Sequoia 15.0 (24A335)
 * @par Modification Log:
 * <table>
 * <tr><th>Date        <th>Version  <th>Author    <th>Description
 * <tr><td>2024/10/04  <td>1.0      <td>Ao XIE    <td>Created initial version with dynamic year and basic footer styling
 * </table>
 ******************************************************************
 */

export default function Footer() {
    return (
        <footer className="footer footer-left bg-base-300 text-base-content p-10 bottom-0 ">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by team KASA.</p>
            </aside>
        </footer>
    );
}