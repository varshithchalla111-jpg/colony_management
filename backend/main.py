from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId

app = FastAPI()

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# MONGODB
# =========================================

client = MongoClient("mongodb://localhost:27017")

db = client["colony_management"]

owners_collection = db["owners"]

users_collection = db["users"]

settings_collection = db["settings"]

payments_collection = db["payments"]

expenses_collection = db["expenses"]

meetings_collection = db["meetings"]


# =========================================
# CREATE DEFAULT ADMIN
# =========================================

if users_collection.count_documents({}) == 0:

    users_collection.insert_one({
        "username": "admin",
        "password": "admin1234"
    })


# =========================================
# CREATE DEFAULT SETTINGS
# =========================================

if settings_collection.count_documents({}) == 0:

    settings_collection.insert_one({
        "currentBalance": 0
    })


# =========================================
# HOME
# =========================================

@app.get("/")
def home():

    return {
        "message": "Backend running"
    }


# =========================================
# LOGIN
# =========================================

@app.post("/login")
def login(data: dict):

    user = users_collection.find_one({
        "username": data["username"],
        "password": data["password"]
    })

    if user:

        return {
            "success": True,
            "message": "Login successful"
        }

    return {
        "success": False,
        "message": "Invalid username or password"
    }


# =========================================
# SETTINGS APIs
# =========================================

@app.get("/settings")
def get_settings():

    settings = settings_collection.find_one()

    if not settings:

        settings_collection.insert_one({
            "currentBalance": 0
        })

        settings = settings_collection.find_one()

    settings["_id"] = str(settings["_id"])

    return settings


@app.put("/settings")
def update_settings(updated_settings: dict):

    settings = settings_collection.find_one()

    if settings:

        settings_collection.update_one(
            {"_id": settings["_id"]},
            {"$set": updated_settings}
        )

    return {
        "message": "Settings updated"
    }


# =========================================
# OWNERS APIs
# =========================================

@app.get("/owners")
def get_owners():

    owners = []

    for owner in owners_collection.find():

        owner["_id"] = str(owner["_id"])

        owners.append(owner)

    return owners


@app.post("/owners")
def add_owner(owner: dict):

    owners_collection.insert_one(owner)

    return {
        "message": "Owner added successfully"
    }


@app.delete("/owners/{owner_id}")
def delete_owner(owner_id: str):

    owners_collection.delete_one({
        "_id": ObjectId(owner_id)
    })

    return {
        "message": "Owner deleted"
    }


@app.put("/owners/{owner_id}")
def update_owner(owner_id: str, updated_owner: dict):

    owners_collection.update_one(
        {"_id": ObjectId(owner_id)},
        {"$set": updated_owner}
    )

    return {
        "message": "Owner updated"
    }


# =========================================
# PAYMENTS APIs
# =========================================

@app.get("/payments")
def get_payments():

    payments = []

    for payment in payments_collection.find():

        payment["_id"] = str(payment["_id"])

        payments.append(payment)

    return payments


@app.post("/payments")
def add_payment(payment: dict):

    payments_collection.insert_one(payment)

    return {
        "message": "Payment added successfully"
    }


@app.delete("/payments/{payment_id}")
def delete_payment(payment_id: str):

    payments_collection.delete_one({
        "_id": ObjectId(payment_id)
    })

    return {
        "message": "Payment deleted"
    }


@app.put("/payments/{payment_id}")
def update_payment(payment_id: str, updated_payment: dict):

    payments_collection.update_one(
        {"_id": ObjectId(payment_id)},
        {"$set": updated_payment}
    )

    return {
        "message": "Payment updated"
    }


# =========================================
# EXPENSE APIs
# =========================================

@app.get("/expenses")
def get_expenses():

    expenses = []

    for expense in expenses_collection.find():

        expense["_id"] = str(expense["_id"])

        expenses.append(expense)

    return expenses


@app.post("/expenses")
def add_expense(expense: dict):

    expenses_collection.insert_one(expense)

    return {
        "message": "Expense added successfully"
    }


@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):

    expenses_collection.delete_one({
        "_id": ObjectId(expense_id)
    })

    return {
        "message": "Expense deleted"
    }


@app.put("/expenses/{expense_id}")
def update_expense(expense_id: str, updated_expense: dict):

    expenses_collection.update_one(
        {"_id": ObjectId(expense_id)},
        {"$set": updated_expense}
    )

    return {
        "message": "Expense updated"
    }


# =========================================
# MEETINGS APIs
# =========================================

@app.get("/meetings")
def get_meetings():

    meetings = []

    for meeting in meetings_collection.find():

        meeting["_id"] = str(meeting["_id"])

        meetings.append(meeting)

    return meetings


@app.post("/meetings")
def add_meeting(meeting: dict):

    meetings_collection.insert_one(meeting)

    return {
        "message": "Meeting added successfully"
    }






@app.put("/meetings/{meeting_id}")
def update_meeting(meeting_id: str, updated_meeting: dict):

    meetings_collection.update_one(
        {"_id": ObjectId(meeting_id)},
        {"$set": updated_meeting}
    )

    return {
        "message": "Meeting updated"
    }


@app.delete("/meetings/{meeting_id}")
def delete_meeting(meeting_id: str):

    meetings_collection.delete_one(
        {"_id": ObjectId(meeting_id)}
    )

    return {
        "message": "Meeting deleted"
    }


@app.get("/meeting-stats")
def meeting_stats():

    meetings = list(
        meetings_collection.find()
    )

    total_minutes = 0

    for meeting in meetings:

        total_minutes += int(
            meeting.get("totalMinutes", 0)
        )

    return {

        "totalMeetings": len(meetings),

        "totalMinutes": total_minutes,

        "hours": total_minutes // 60,

        "minutes": total_minutes % 60

    }


# =========================================
# DASHBOARD STATS
# =========================================

@app.get("/dashboard-stats")
def dashboard_stats():

    owners_count = owners_collection.count_documents({})

    payments = list(payments_collection.find())

    expenses = list(expenses_collection.find())

    settings = settings_collection.find_one()


    membership_income = 0

    subscription_income = 0

    total_expenses = 0


    for payment in payments:

        if payment["paymentType"] == "Membership":

            membership_income += int(payment["amount"])

        elif payment["paymentType"] == "Yearly Subscription":

            subscription_income += int(payment["amount"])

    for expense in expenses:

        total_expenses += int(expense["amount"])

    total_income = membership_income + subscription_income


    current_balance = 0

    if settings and "currentBalance" in settings:

        current_balance = settings["currentBalance"]


    return {

        "totalOwners": owners_count,

        "membershipIncome": membership_income,

        "subscriptionIncome": subscription_income,

        "totalIncome": total_income,

        "totalExpenses": total_expenses,

        "balance": current_balance

    }


# =========================================
# UNPAID OWNERS
# =========================================

@app.get("/unpaid-owners/{year}")
def get_unpaid_owners(year: int):

    all_owners = list(owners_collection.find())

    payments = list(payments_collection.find({
        "paymentType": "Yearly Subscription",
        "year": year
    }))


    paid_owner_names = []

    for payment in payments:

        paid_owner_names.append(payment["ownerName"])


    unpaid_owners = []

    for owner in all_owners:

        if owner["name"] not in paid_owner_names:

            owner["_id"] = str(owner["_id"])

            unpaid_owners.append(owner)


    return unpaid_owners