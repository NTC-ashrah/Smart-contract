Custodial Section Smart Contract

Overview
The Custodial Section smart contract is designed to manage prisoner records within a jail system on the Ethereum blockchain. It provides functionalities for adding and releasing prisoners, while ensuring only the administrator can perform these actions. The contract also maintains the jail's capacity and current prisoner count, ensuring that the jail does not exceed its capacity.

Features
Prisoner Management: Allows for the addition and release of prisoners with detailed information.
Access Control: Ensures that only the admin can perform critical operations like adding or releasing prisoners.
Capacity Control: Monitors the jail's capacity to prevent overpopulation.
Event Logging: Emits events for adding and releasing prisoners, facilitating tracking and transparency.
Error Handling: Utilizes require, assert, and revert statements for robust error handling and validation.
Key Components
Prisoner Struct
The contract uses a Prisoner struct to store each prisoner's details, including their unique ID, name, age, crime committed, and release status.

State Variables
Admin: The address of the contract administrator.
Next Prisoner ID: A counter used to assign unique IDs to prisoners.
Jail Capacity: The maximum number of prisoners the jail can hold.
Current Prisoner Count: The current number of prisoners in the jail.
Prisoners Mapping: A mapping to store prisoner details indexed by their ID.
Events
PrisonerAdded: Emitted when a new prisoner is added.
PrisonerReleased: Emitted when a prisoner is released.
Modifiers
onlyAdmin: Restricts function access to the admin.
prisonerExists: Ensures that a prisoner with a given ID exists.
hasCapacity: Ensures that the jail has not reached its capacity.
Constructor
The constructor initializes the contract by setting the admin to the deployer's address, setting the jail capacity, and initializing counters for prisoner IDs and the current prisoner count.

Functions
Adding a Prisoner
The addPrisoner function allows the admin to add a new prisoner to the jail. It checks for valid input data and ensures the jail has capacity. Upon successful addition, it updates the prisoner mapping and increments relevant counters.

Releasing a Prisoner
The releasePrisoner function allows the admin to release a prisoner. It ensures the prisoner exists and has not already been released. Upon successful release, it updates the prisoner's status and decrements the current prisoner count.

Retrieving Prisoner Details
The getPrisoner function allows anyone to retrieve a prisoner's details by providing the prisoner's ID. It ensures the prisoner exists before returning their details.

Changing the Admin
The changeAdmin function allows the current admin to transfer admin rights to a new address. It ensures the new admin address is valid.

Assert and Revert Examples
The contract includes example functions (assertExample and revertExample) to demonstrate the use of assert and revert statements for error handling.

Usage
Deploy the Contract

Deploy the contract with the specified jail capacity.
The deployer's address is set as the admin.
Admin Actions

Add prisoners using the addPrisoner function.
Release prisoners using the releasePrisoner function.
Change admin using the changeAdmin function.
Public Actions

Retrieve prisoner details using the getPrisoner function.
License
This project is licensed under NTC-Ashrah License. See the LICENSE file for details.

Author
[NTC-OLIVAR] - Initial work and concept.
