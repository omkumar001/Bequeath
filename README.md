# Bequeath
It is an online NGO donation System where the donors can donate to the NGO of their choice and Owner can register and receive the donation for their NGO .


# Flow of the Website to be Designed :-

• The website opens up with the Homepage UI.
• Then from there we are having 2 options , either Continue as the Owner or the
Donor.


# New updated modifications in project :-

• There will be two databases one will contain the NGO owner and the
NGO details and the other one will contain the donor details and the
NGO he donated in and the total amount. The database used will be
NoSql database MongoDB.

• For verifying the authenticity of the NGO we will take the registration
certificate from the NGO to upload which will contain the registration
number and also the date of registration. This way we can see the NGOs
listed on government website and verify from there if we want to.

# Owner/ Donor :-

• Sign Up / Login
• View NGO Profile Register NGO
• Sign Up / Login
• My Donations 
• Select Type of NGO to Donate
• Donate Now
• Owner Profile Details


# Server and Client Validation :-

• For server side validation we have ensured that no two
users can register themselves with the same email id in
the corresponding owners and donors side.

• The password validation is also being done using the
server side validation by checking if the password of the
corresponding user matches with those stored in the
server during the registration.

• During donation , the client side validation is done for
the following fields like CVV Number should be at max.
3 digits and card number is a 16-digit valid number.
• The Full name field in the Donate Form should have
spaces in between ensuring the syntax First Name
Middle Name Last Name .

• The Email field should have the proper syntax like
xyz@gmail.com ( which means it should include “ @”
and should have a “.” operator ).

• Every form used in the website should have all of their
field necessary which has been made sure by including
the required attribute in corresponding input fields.

• The password used in our website is made secured by
using the md5 module which uses the hashing concept
to encrypt the password into 128-bit hash value. ( which
means the database administrator cannot breach the
security by misusing the password for the malicious
use.)


# Features :-

• Only single registration of the NGO can be done from
the owner’s side.

• To ensure that the NGO is authorised and approved by
the government we have attached the NGO registration
Certificate with with the other details of the NGO , so
that the Donor is satisfied about his donation i.e. his
money is going to the proper place.


To visit the website click on http://bequeath.herokuapp.com/
