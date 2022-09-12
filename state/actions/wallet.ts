import React from "react";
import {
  WalletListApi,
  WalletDepositApi,
  WalletWithdrawApi,
  WalletWithdrawProcessApi,
} from "service/wallet";
import { toast } from "react-toastify";


export const WalletListApiAction = async (
  url: string,
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setProcessing(true);
  const response = await WalletListApi(url);
  setProcessing(false);
  return response.data;
};
export const SearchObjectArrayFuesJS = (
  array: any,
  setArray: React.Dispatch<React.SetStateAction<any>>,
  search: string
) => {
  if (!search) setArray(array.data);
  const newArray = array.data.filter((item: any) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  setArray(newArray);
};

export const WalletDepositApiAction = async (
  id: number,
  setProcessing: React.Dispatch<React.SetStateAction<any>>
) => {
  setProcessing({
    withdraw: false,
    deposit: true,
  });

  const response = await WalletDepositApi(id);
  setProcessing({
    withdraw: false,
    deposit: false,
  });
  return response;
};

export const WalletWithdrawApiAction = async (
  id: number,
  setProcessing: React.Dispatch<React.SetStateAction<any>>
) => {
  setProcessing({
    withdraw: true,
    deposit: false,
  });
  const response = await WalletWithdrawApi(id);
  setProcessing({
    withdraw: false,
    deposit: false,
  });
  return response;
};

export const WalletWithdrawProcessApiAction = async (
  credential: any,
  setProcessing: React.Dispatch<React.SetStateAction<any>>
) => {
  setProcessing(true);
  const response = await WalletWithdrawProcessApi(credential);
  if (response.success === true) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
  setProcessing(false);
  return response;
};
