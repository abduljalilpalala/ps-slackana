import React, { useState } from "react";
import { ChevronDown, Search } from "react-feather";

import MemberFilter from "../MemberFilter";
import { teamData } from "~/shared/jsons/teamData";
import DialogBox from "~/components/templates/DialogBox";
import PeopleList from "~/components/molecules/PeopeList";
import MemberList from "~/components/molecules/MemberList";
import AddPeopleButton from "~/components/atoms/AddPeopleButton";

const AddMemberModal = ({ close }: { close: (value: boolean) => void }) => {
  const [filterData, setFilterData] = useState<{ team: string, members: number }>({ team: 'Everyone', members: 0 });
  const [addPeopleModal, setAddPeopleModal] = useState<boolean>(false);

  const arrayData = [...Array(20)];

  const addPeople = (): void => {
    setAddPeopleModal(!addPeopleModal);
    console.log('integrate add people');
  }

  const seFilter = (data: { team: string, members: number }): void => {
    setFilterData(data);
    console.log('integrate filter');
  }

  const addPeopleComponent = (
    <DialogBox isOpen={true} closeModal={() => setAddPeopleModal(!addPeopleModal)} headerTitle="Add people" bodyClass="!px-0 !pb-0 mobile:!px-0 !pt-0">
      <div className="flex flex-col">
        <div className="mt-3 flex items-center justify-between border-b pb-3 px-6">
          <div className="w-full flex flex-row border border-slate-300 items-center pl-2 rounded-md">
            <Search color="#94A3B8" />
            <input type="text" className="w-full border-none focus:ring-transparent text-slate-900 mr-5" placeholder="Find members" />
          </div>
        </div>

        <div className="h-[300px] mb-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-gray-100">
          {arrayData.map((x, index: number) => {
            return index === (arrayData.length - 1) ? <PeopleList key={index} className="mb-[200px]" /> : <PeopleList key={index} />
          })}
        </div>
      </div>
    </DialogBox>
  );

  return (
    <DialogBox isOpen={true} closeModal={() => close(false)} headerTitle="Add member" bodyClass="!px-0 !pb-0 mobile:!px-0 !pt-0">
      {addPeopleModal && addPeopleComponent}
      <div className="flex flex-col">
        <div className="mt-3 flex items-center justify-between border-b pb-3 px-6">
          <div className="flex flex-row items-center gap-3">
            <AddPeopleButton onClick={addPeople} />
            <p>Add people</p>
          </div>
          <MemberFilter callback={(data: any) => seFilter(data)} data={teamData} className="w-[42%] cursor-pointer">
            <div className="flex justify-between w-full px-3 py-1 rounded-md border border-slate-300">
              <div className="text-slate-400">
                {filterData.team}
              </div>
              <div>
                {<ChevronDown color="#94A3B8" />}
              </div>
            </div>
          </MemberFilter>
        </div>

        <div className="h-[500px] mb-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-gray-100">
          {arrayData.map((x, index: number) => {
            return index === (arrayData.length - 1) ? <MemberList key={index} className="mb-[200px]" /> : <MemberList key={index} />
          })}
        </div>
      </div>
    </DialogBox>
  );
};

export default AddMemberModal;
