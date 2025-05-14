'use client'
import {
    mdiMonitorCellphone,
    mdiTableBorder,
    mdiTableOff,
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import CardBoxComponentEmpty from "../../../_components/CardBox/Component/Empty";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import TableGeneric from "../_components/GeneralTable";
import { testGetUser } from "../../../api/api";
import { useEffect, useState } from "react";

export default function TablesClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await testGetUser();
                console.log("完整返回:", response);

                if (response.code === 200 && Array.isArray(response.data)) {
                    setTableData({
                        data: response.data,
                        column: response.column || []
                    });
                } else {
                    console.error("API 返回格式不正确:", response);
                }
            } catch (error) {
                console.error("获取用户数据失败:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <SectionMain>
            <SectionTitleLineWithButton icon={mdiTableBorder} title="用户管理" main />

            <NotificationBar color="info" icon={mdiMonitorCellphone}>
                <b>Responsive table.</b> Collapses on mobile
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <TableGeneric data={tableData.data || []} column={tableData.column || []} />
            </CardBox>

            <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

            <NotificationBar color="danger" icon={mdiTableOff}>
                <b>Empty card.</b> When there&apos;s nothing to show
            </NotificationBar>

            <CardBox>
                <CardBoxComponentEmpty />
            </CardBox>
        </SectionMain>
    );
}
