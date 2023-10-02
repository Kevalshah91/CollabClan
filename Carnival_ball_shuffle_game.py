from random import shuffle

def shuffle_list(my_list):
    shuffle(my_list)
    return my_list

def player_guess():
    while True:
        guess = input("Pick a number: 0, 1, 2, 3, 4: ")
        if guess in ['0', '1', '2', '3', '4']:
            return int(guess)
        else:
            print("Invalid input. Please enter a number between 0 and 4.")

def check_guess(mylist, guess):
    if mylist[guess] == '0':
        print("Congratulations! You won!")
    else:
        print("You lose.")
        print(mylist)

mylist = ['','0','','','']
new_list = shuffle_list(mylist)
guess = player_guess()
check_guess(new_list, guess)        