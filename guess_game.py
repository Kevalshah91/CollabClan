#Guess the number game 
import random
n = random.randint(1,200)
print("Game started ! 'Guess the number'.")
print("You would get 8 guesses to guess the number in which I would be helping you with a hint")
number_of_guesses = 1
while(number_of_guesses <= 8):
     num = int(input("guess the number\n"))
     if num<n:
        print("this is a lesser number , give a bigger number")
     elif num>n:
        print("this is a greater number , give a smaller number")
     else:
        print("Congratulations you won !!! ")
        print(number_of_guesses, "guesses you took to finish.")
        break
     print(8 - number_of_guesses, "guesses left")
     number_of_guesses = number_of_guesses + 1
if number_of_guesses > 8:
     print("GAME OVER")
print("The correct number is : ",n)