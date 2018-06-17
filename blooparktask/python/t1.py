
pm = '1234567891a'
check = [x.isdigit() for x in pm]
if (all(check)) & (len(check) == 11):
    print("True,",all(check),len(check))
else :
    print("False,",all(check),len(check))
