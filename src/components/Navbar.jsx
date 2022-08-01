import React from "react";

export const Navbar = () => {
    return (
        <div className={"flex py-4 justify-between items-center"}>
            <span className={"flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm"}>E</span>

            <ul className="flex gap-8">
                <li><a href="/" className={"text-xs text-gray-600 hover:text-white"}></a>Главная</li>
                <li><a href="/" className={"text-xs text-gray-400 hover:text-white"}></a>Мои посты</li>
                <li><a href="/" className={"text-xs text-gray-400 hover:text-white"}></a>Добавить пост</li>
            </ul>

            <div className={"flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2"}>
                <button>Войти</button>
            </div>
        </div>
    );
};
