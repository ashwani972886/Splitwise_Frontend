import React from 'react';
import { AddFriendModal, AddExpense, PaidByPeople, SplitOptions, ExpenseNotes, SettleExpense, ChoosePayer, ChooseRecipient, SettleNote} from './';

export default function Modals() {
  return (
    <>
        <AddFriendModal />
        <AddExpense />
        <PaidByPeople />
        <SplitOptions />
        <ExpenseNotes />
        <SettleExpense />
        <ChoosePayer />
        <ChooseRecipient />
        <SettleNote />
    </>
  )
}
