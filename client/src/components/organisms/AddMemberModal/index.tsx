import React, { useEffect, useState } from "react";
import { ChevronDown, Search } from "react-feather";

import {
  getMembers,
  getAllUsers,
  filterAllUser,
  filterMembers,
} from "~/redux/member/memberSlice";
import MemberFilter from "../MemberFilter";
import DialogBox from "~/components/templates/DialogBox";
import PeopleList from "~/components/molecules/PeopeList";
import MemberList from "~/components/molecules/MemberList";
import { AddMemberFilterProps } from "./AddMemberFilterType";
import AddPeopleButton from "~/components/atoms/AddPeopleButton";
import { useAppDispatch, useAppSelector } from "~/hooks/reduxSelector";

const AddMemberModal = ({ close }: AddMemberFilterProps) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addPeopleModal, setAddPeopleModal] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any>({ id: -1, name: "Everyone" });

  const { member: { member, userList }, project } = useAppSelector((state) => state);
  const { overviewProject, refresher: { memberStateUpdate }, userPermission: can } = project || {};
  const { id: projectID, teams } = overviewProject || {};
  const { id: teamID, name } = filterData;

  const setFilter = (data: any): void => {
    setFilterData(data);
  }

  const onSearchChange = (e: any): void => {
    const value = e.target.value;
    setSearch(value);
    if (value.length === 0) {
      setIsLoading(true);
      dispatch(filterAllUser({ projectID, searchValue: value })).then((_) => {
        setIsLoading(false);
      });
    }
  }

  const onSearch = (e: any): void => {
    const value = e.target.value;
    const isEnter = e.key === "Enter" || e.keyCode === 13;

    if (!isEnter) return;
    setIsLoading(true);
    dispatch(filterAllUser({ projectID, searchValue: value })).then((_) => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    dispatch(getMembers(projectID));
    dispatch(getAllUsers(projectID));
  }, [projectID])

  useEffect(() => {
    setIsLoading(true);
    dispatch(filterMembers({
      projectID,
      teamID: teamID < 0 ? 0 : teamID
    })).then(() => {
      setIsLoading(false);
    })
  }, [teamID])

  useEffect(() => {
    if (memberStateUpdate) {
      dispatch(getAllUsers(projectID));
      dispatch(getMembers(projectID));
    }
  }, [memberStateUpdate])

  const addPeopleComponent = (
    <DialogBox
      isOpen={true}
      closeModal={() => setAddPeopleModal(!addPeopleModal)}
      headerTitle="Add people"
      bodyClass="!px-0 !pb-0 mobile:!px-0 !pt-0"
    >
      <div className="flex flex-col">
        <div className="mt-3 flex items-center justify-between border-b pb-3 px-6">
          <div className="w-full flex flex-row border border-slate-300 items-center pl-2 rounded-md">
            <Search color="#94A3B8" />
            <input
              type="text"
              value={search || ""}
              onKeyDown={onSearch}
              onChange={onSearchChange}
              className="w-full border-none focus:ring-transparent text-slate-900 mr-5"
              placeholder="Find members"
            />
          </div>
        </div>

        <div className="h-[300px] mb-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-gray-100">
          {!userList || isLoading
            ? <PeopleList isLoading={isLoading} />
            : userList?.length === 0
              ? <h1 className="text-px-18 text-slate-600 opacity-60 mt-5">No available data</h1>
              : userList?.map((userData: any, index: number) => {
                return <PeopleList key={index} data={userData} className={index === (userList.length - 1) && "mb-[200px]"} />
              })}
        </div>
      </div>
    </DialogBox>
  );


  return (
    <DialogBox
      isOpen={true}
      closeModal={() => close(false)}
      headerTitle="Add member"
      bodyClass="!px-0 !pb-0 mobile:!px-0 !pt-0"
    >
      {addPeopleModal && addPeopleComponent}
      <div className="flex flex-col">
        <div className="mt-3 flex items-center justify-between border-b pb-3 px-6">
          <div className="flex flex-row items-center gap-3">
            {
              can?.addMember && (
                <>
                  <AddPeopleButton onClick={() => {
                    setAddPeopleModal(!addPeopleModal)
                  }} />
                  <p>Add people</p>
                </>
              )
            }
          </div>
          <MemberFilter
            callback={(data: any) => setFilter(data)}
            data={teams}
            className="w-[42%] cursor-pointer"
          >
            <div className="flex justify-between w-full px-3 py-1 rounded-md border border-slate-300">
              <div className="text-slate-400 truncate w-full max-w-[130px] text-left">
                {name}
              </div>
              <div>
                {<ChevronDown color="#94A3B8" />}
              </div>
            </div>
          </MemberFilter>
        </div>

        <div className="h-[500px] mb-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-gray-100">
          {!member || isLoading
            ? <MemberList isLoading={isLoading} />
            : member?.length === 0
              ? <h1 className="text-px-18 text-slate-600 opacity-60 mt-5">No available data</h1>
              : member?.map((memberData: any, index: number) => {
                if (!memberData?.is_removed) {
                  return (
                    <MemberList
                      key={index}
                      data={memberData}
                      filterData={teamID}
                      isLast={index === (member.length - 1)}
                    />
                  );
                }
              })}
        </div>
      </div>
    </DialogBox>
  );
};

export default AddMemberModal;
