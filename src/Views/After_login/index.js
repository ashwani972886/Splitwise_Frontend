import Header2 from './Header';
import Setup from './Setup';
import Dashboard from './Dashboard/Dashboard';
import MainDashboard  from './Dashboard/MainDashboard';
import RecentActivity from './Dashboard/RecentActivity';
import AllExpenses from './Dashboard/AllExpenses';
import CreateGroup from './CreateGroup';
import Group from './Dashboard/Group';
import Friend from './Dashboard/Friend';

// Add friend modal
import AddFriendModal from './AddFriendModal';
// Modals Expense and Settle
import AddExpense from './Modals/AddExpense';
import PaidByPeople from './Modals/PaidByPeople';
import SplitOptions from './Modals/SplitOptions';
import ExpenseNotes from './Modals/ExpenseNotes';
import SettleExpense from './Settle_Modals/SettleExpense';
import ChoosePayer from './Settle_Modals/ChoosePayer';
import ChooseRecipient from './Settle_Modals/ChooseRecipient';
import SettleNote from './Settle_Modals/SettleNote';
import Modals from './Modals';

export {
    Header2, Setup, Dashboard, MainDashboard, RecentActivity, AllExpenses, CreateGroup, Group, Friend, 
    
    AddFriendModal, AddExpense, PaidByPeople, SplitOptions, ExpenseNotes, SettleExpense, ChoosePayer, ChooseRecipient, SettleNote, Modals
};