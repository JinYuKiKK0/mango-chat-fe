"use client";

import React, { ReactNode } from "react";
import { useState } from "react";
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import menuAside from "../dashboard/_lib/menuAside";
import menuNavBar from "../dashboard/_lib/menuNavBar";
import Icon from "../_components/Icon";
import NavBar from "../dashboard/_components/NavBar";
import NavBarItemPlain from "../dashboard/_components/NavBar/Item/Plain";
import AsideMenu from "../dashboard/_components/AsideMenu";
import FooterBar from "../dashboard/_components/FooterBar";
import FormField from "../_components/FormField";
import { Field, Form, Formik } from "formik";
import AdminOnly from "../_components/AdminOnly";
import SectionMain from "../_components/Section/Main";

type Props = {
    children: ReactNode;
};

export default function LayoutAuthenticated({ children }: Props) {
    const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
    const [isAsideLgActive, setIsAsideLgActive] = useState(false);

    const handleRouteChange = () => {
        setIsAsideMobileExpanded(false);
        setIsAsideLgActive(false);
    };

    const layoutAsidePadding = "xl:pl-60";

    return (
        <AdminOnly 
            fallback={
                <SectionMain>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="text-6xl text-gray-300 mb-4">🔒</div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">权限不足</h2>
                            <p className="text-gray-500">您没有权限访问管理后台，请联系管理员</p>
                            <div className="mt-4">
                                <a 
                                    href="/basic-chat" 
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    返回聊天页面
                                </a>
                            </div>
                        </div>
                    </div>
                </SectionMain>
            }
        >
        <div className={`overflow-hidden lg:overflow-visible`}>
            <div
                className={`${layoutAsidePadding} ${
                    isAsideMobileExpanded ? "ml-60 lg:ml-0" : ""
                } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
            >
                <NavBar
                    menu={menuNavBar}
                    className={`${layoutAsidePadding} ${isAsideMobileExpanded ? "ml-60 lg:ml-0" : ""}`}
                >
                    <NavBarItemPlain
                        display="flex lg:hidden"
                        onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
                    >
                        <Icon
                            path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger}
                            size="24"
                        />
                    </NavBarItemPlain>
                    <NavBarItemPlain
                        display="hidden lg:flex xl:hidden"
                        onClick={() => setIsAsideLgActive(true)}
                    >
                        <Icon path={mdiMenu} size="24" />
                    </NavBarItemPlain>
                </NavBar>
                <AsideMenu
                    isAsideMobileExpanded={isAsideMobileExpanded}
                    isAsideLgActive={isAsideLgActive}
                    menu={menuAside}
                    onAsideLgClose={() => setIsAsideLgActive(false)}
                    onRouteChange={handleRouteChange}
                />
                {children}
                <FooterBar>
                </FooterBar>
            </div>
        </div>
        </AdminOnly>
    );
}
