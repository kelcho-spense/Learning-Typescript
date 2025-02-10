import './style.css'
import { MenuItem, mainMenu } from './menu.config'

class SimToolkit {
  private currentMenu: MenuItem[] = mainMenu;
  private menuHistory: MenuItem[][] = [];
  private balance: number = 0;
  private phoneNumber: string = '0712345678';

  constructor() {
    this.initializeUI();
    this.displayCurrentMenu();
  }

  private initializeUI() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
            <div class="sim-toolkit">
                <div class="phone-info">
                    <div class="phone-number">Phone: ${this.phoneNumber}</div>
                    <div class="balance-display">Balance: Sh <span id="balanceDisplay">${this.balance}</span></div>
                </div>
                <div class="credit-area">
                    <input type="number" id="creditAmount" placeholder="Amount">
                    <button id="creditButton">Credit Account</button>
                </div>
                <button id="ussdButton">*444#</button>
                <div class="menu-display" style="display: none">
                    <div class="menu-list"></div>
                    <div class="input-area">
                        <input type="text" id="menuInput" placeholder="Enter selection">
                    </div>
                    <div class="button-area">
                        <button id="sendButton">Send</button>
                        <button id="cancelButton">Cancel</button>
                    </div>
                </div>
            </div>
        `;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    document.querySelector('#ussdButton')?.addEventListener('click', () => {
      (document.querySelector('.menu-display') as HTMLElement).style.display = 'block';
      this.currentMenu = mainMenu;
      this.menuHistory = [];
      this.displayCurrentMenu();
    });

    document.querySelector('#creditButton')?.addEventListener('click', () => {
      const amount = parseInt((document.querySelector('#creditAmount') as HTMLInputElement).value);
      if (!isNaN(amount)) {
        this.balance += amount;
        this.updateBalanceDisplay();
        (document.querySelector('#creditAmount') as HTMLInputElement).value = '';
      }
    });

    document.querySelector('#sendButton')?.addEventListener('click', () => {
      const input = (document.querySelector('#menuInput') as HTMLInputElement).value;
      this.handleMenuSelection(input);
      (document.querySelector('#menuInput') as HTMLInputElement).value = '';
    });

    document.querySelector('#cancelButton')?.addEventListener('click', () => {
      if (this.menuHistory.length > 0) {
        this.currentMenu = this.menuHistory.pop()!;
        this.displayCurrentMenu();
      } else {
        (document.querySelector('.menu-display') as HTMLElement).style.display = 'none';
      }
    });
  }

  private displayCurrentMenu() {
    const menuList = document.querySelector('.menu-list')!;
    menuList.innerHTML = this.currentMenu.map((item, index) => `
            <div class="menu-item">${index}. ${item.text}${item.price ? ` (Sh ${item.price})` : ''}</div>
        `).join('');
  }

  private handleMenuSelection(input: string) {
    const selection = parseInt(input);
    if (isNaN(selection) || selection < 0 || selection >= this.currentMenu.length) {
      alert('Invalid selection');
      return;
    }

    const selectedItem = this.currentMenu[selection];

    if (selectedItem.subMenu) {
      this.menuHistory.push(this.currentMenu);
      this.currentMenu = selectedItem.subMenu;
      this.displayCurrentMenu();
    } else if (selectedItem.price) {
      if (this.balance >= selectedItem.price) {
        this.balance -= selectedItem.price;
        this.updateBalanceDisplay();
        alert(`Successfully purchased: ${selectedItem.text}`);
        (document.querySelector('.menu-display') as HTMLElement).style.display = 'none';
      } else {
        alert('Insufficient balance');
      }
    } else if (selectedItem.text === 'Back') {
      if (this.menuHistory.length > 0) {
        this.currentMenu = this.menuHistory.pop()!;
        this.displayCurrentMenu();
      }
    } else if (selectedItem.text === 'Balance') {
      alert(`Your balance is: Sh ${this.balance}`);
      (document.querySelector('.menu-display') as HTMLElement).style.display = 'none';
    }
  }

  private updateBalanceDisplay() {
    document.querySelector('#balanceDisplay')!.textContent = this.balance.toString();
  }
}

// Initialize the application
new SimToolkit();
