import type { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import ReportSidebar from "layout/report-sidebar";
import {
  CoinConvertHistoryAction,
  handleSwapHistorySearch,
} from "state/actions/reports";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import TableLoading from "components/common/TableLoading";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import DataTable from "react-data-table-component";
const SwapHistory: NextPage = () => {
  const { t } = useTranslation("common");
  type searchType = string;
  const [search, setSearch] = React.useState<searchType>("");
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [history, setHistory] = React.useState<any>([]);
  const [stillHistory, setStillHistory] = React.useState<any>([]);
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    CoinConvertHistoryAction(
      10,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory
    );
  };
  const getReport = async () => {
    CoinConvertHistoryAction(10, 1, setHistory, setProcessing, setStillHistory);
  };
  const columns = [
    {
      name: "From Wallet",
      selector: (row: any) => row?.from_wallet?.name,
      sortable: true,
    },
    {
      name: "To Wallet",
      selector: (row: any) => row.to_wallet?.name,
      sortable: true,
    },
    {
      name: "Requested Amount",
      selector: (row: any) => row.requested_amount,
      sortable: true,
      cell: (row: any) => (
        <div className="blance-text">
          <span className="blance market incree">
            ${parseFloat(row?.requested_amount).toFixed(8)}
          </span>
        </div>
      ),
    },
    {
      name: "Converted Amount",
      selector: (row: any) => parseFloat(row.converted_amount).toFixed(8),
      sortable: true,
    },
    {
      name: "Rate",
      selector: (row: any) => row.rate,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row: any) => row.created_at,
      sortable: true,
      cell: (row: any) => (
        <div>{moment(row.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
      cell: (row: any) => (
        <div>
          {row.status === 0 ? (
            <span className="text-warning">{t("Pending")}</span>
          ) : row.status === 1 ? (
            <span className="text-success"> {t("Success")}</span>
          ) : (
            <span className="text-danger">{t("Failed")}</span>
          )}
        </div>
      ),
    },
  ];
  React.useEffect(() => {
    getReport();
    return () => {
      setHistory([]);
    };
  }, []);
  return (
    <div className="page-wrap">
      <ReportSidebar />
      <div className="page-main-content">
        <div className="container-fluid">
          <div className="section-top-wrap mb-25">
            <div className="overview-area">
              <div className="overview-left">
                <h2 className="section-top-title">{t("Coin Swap History")}</h2>
              </div>
            </div>
          </div>

          <div className="asset-balances-area">
            {processing ? (
              <TableLoading />
            ) : (
              <div className="asset-balances-left">
                <div className="section-wrapper">
                  <div className="table-responsive">
                    <div
                      id="assetBalances_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <div className="dataTables_head">
                        <div
                          className="dataTables_length"
                          id="assetBalances_length"
                        >
                          <label className="">
                            {t("Show")}
                            <select
                              name="assetBalances_length"
                              aria-controls="assetBalances"
                              className=""
                              onChange={(e) => {
                                CoinConvertHistoryAction(
                                  parseInt(e.target.value),
                                  1,
                                  setHistory,
                                  setProcessing,
                                  setStillHistory
                                );
                              }}
                            >
                              <option selected disabled hidden>
                                10
                              </option>
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                            {t("entries")}
                          </label>
                        </div>
                        <div id="table_filter" className="dataTables_filter">
                          <label>
                            {t("Search:")}
                            <input
                              type="search"
                              className="data_table_input"
                              aria-controls="table"
                              value={search}
                              onChange={(e) => {
                                handleSwapHistorySearch(
                                  e,
                                  setSearch,
                                  stillHistory,
                                  setHistory
                                );
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <DataTable columns={columns} data={history} />

                    <div
                      className="pagination-wrapper"
                      id="assetBalances_paginate"
                    >
                      <span>
                        {stillHistory?.list?.links.map(
                          (link: any, index: number) =>
                            link.label === "&laquo; Previous" ? (
                              <a
                                className="paginate-button"
                                onClick={() => {
                                  if (link.url) LinkTopaginationString(link);
                                }}
                                key={index}
                              >
                                <i className="fa fa-angle-left"></i>
                              </a>
                            ) : link.label === "Next &raquo;" ? (
                              <a
                                className="paginate-button"
                                onClick={() => LinkTopaginationString(link)}
                                key={index}
                              >
                                <i className="fa fa-angle-right"></i>
                              </a>
                            ) : (
                              <a
                                className="paginate_button paginate-number"
                                aria-controls="assetBalances"
                                data-dt-idx="1"
                                onClick={() => LinkTopaginationString(link)}
                                key={index}
                              >
                                {link.label}
                              </a>
                            )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/swap-history");
  return {
    props: {},
  };
};

export default SwapHistory;
