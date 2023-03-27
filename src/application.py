from flask import Flask, jsonify, request
import pymongo
from flask_cors import CORS
from datetime import datetime
import statistics
import math

import csv
import json
from io import StringIO


application = Flask(__name__)
CORS(application)  # , resources=r'/*'
# app.config["MONGO_URI"] = "mongodb://localhost:27017/Sample_Data"
# application.config["MONGO_URI"] = "mongodb+srv://wadezheng0802:0jmVaMjokHSsob9i@cluster0.gncmfim.mongodb.net/Sample_data"
# mongo = pymongo(application)


application.MongoClient = pymongo.mongo_client.MongoClient(
    "mongodb+srv://wadezheng0802:0jmVaMjokHSsob9i@cluster0.gncmfim.mongodb.net/")
# application.MongoClient = pymongo.MongoClient("mongodb://localhost:27017/")


def sql_filter(sql):
    dirty_stuff = ["\"", "\\", "/", "*", "'", "=", "-", "#",
                   ";", "<", " ", "+", "%", "$", "(", ")", "%", "@", "!"]
    for stuff in dirty_stuff:
        sql = sql.replace(stuff, "")
    return sql
# @application.route('/record/<rec>', methods=['GET'])
# def get_one(rec):
#     # """To get one item from the database.
#     db = application.MongoClient["Sample_data"]
#     col = db["Year"]
#     i = col.find_one({'RECORD': int(rec)})
#     output = []
#     output.append({
#         'TIMESTAMP': i['TIMESTAMP'],
#         'RH_Avg': i['RH_Avg'],
#         'RECORD': i['RECORD']
#     })
#     return jsonify({'result': output})


@application.route('/', methods=['GET'])
def homepage():
    return jsonify({"res": "we are the world"})


@application.route('/info/<Device_id>', methods=['GET'])
def get_device_info(Device_id):
    db = application.MongoClient["Device_Info"]
    collection = db["Device_Info"]
    f = collection.find_one({"DEVICEID": Device_id})
    if f is None:
        return jsonify({"error": "Device not found"})
    res = {}
    for k, v in f.items():
        res[k] = v
    res["_id"] = str(res["_id"])
    return jsonify({"result": res})


@application.route('/data/<Device_id>', methods=['GET'])
def get_all_attendees(Device_id):
    # To get all the items from the database.
    db = application.MongoClient["Device_Data"]
    collection = db[Device_id]
    output = []
    r = collection.find()
    for i in r:
        temp = {}
        for k, v in i.items():
            temp[k] = v
        del temp['_id']
        output.append(temp)
    return jsonify({
        'result': output
    })


@application.route('/record/<device_id>/<rec>', methods=['GET'])
def get_one(device_id, rec):
    # """To get one item from the database.
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    i = col.find_one({'RECORD': int(rec)})
    output = []
    output.append({
        'TIMESTAMP': i['TIMESTAMP'],
        'RH_Avg': i['RH_Avg'],
        'RECORD': i['RECORD']
    })
    return jsonify({"result": output})


# @application.route('/insert/<device_id>', methods=['POST'])
# def register(device_id):
#     db = application.MongoClient["Device_Info"]
#     col = db["Device_Info"]
#     f = col.find_one({"DEVICEID": device_id})
#     Lis_V = f["List_V"]
#     resp = []
#     for i in range(len(Lis_V)):
#         resp.append("")
#     for i in range(len(Lis_V)):
#         try:
#             resp[i] = request.json[Lis_V[i]]
#         except KeyError:
#             return jsonify({'error': 'wrong varible names or wrong varible order'})
#     db = application.MongoClient["Device_Data"]
#     col = db[device_id]
#     new_doc = {}
#     for i in range(len(Lis_V)):
#         new_doc[Lis_V[i]] = resp[i]
#     col.insert_one(new_doc)
#     return jsonify({'result': 'Registration successful.'})


@application.route('/export/<device_id>', methods=['POST'])
def export(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    try:
        From_time = request.json['TIMESTAMP_F']
        To_time = request.json['TIMESTAMP_T']
        List_V = request.json['List_V']
    except KeyError as e:
        return jsonify({'error': "The key should be: " + str(e)}), 400
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time}  # 小于等于
    }, {})
    res_l = []
    for m in f:
        dict_t = {}
        for n in List_V:
            dict_t[n] = m[n]
        res_l.append(dict_t)

    return jsonify({'result': res_l})


@application.route('/export-csv/<device_id>', methods=['POST'])
def csv_export(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    try:
        From_time = request.json['TIMESTAMP_F']
        To_time = request.json['TIMESTAMP_T']
        List_V = request.json['List_V']
    except KeyError as e:
        return jsonify({'error': "The key should be: " + str(e)}), 400
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,
        "$lte": To_time
    }
    }, {})
    result = ""
    for i in range(len(List_V)):
        if i == 0:
            result += str(List_V[0])
        else:
            result += (","+str(List_V[i]))
    result += "\n"
    for m in f:
        res_l = ""
        for n in range(len(List_V)):
            if n == 0:
                res_l += str(m[List_V[0]])
            else:
                res_l += ("," + str(m[List_V[n]]))
        res_l += "\n"
        result += res_l
    return jsonify({'result': result})


@application.route('/export-var/<device_id>', methods=['POST'])
def var_export(device_id):
    try:
        db = application.MongoClient["Device_Data"]
        col = db[device_id]
        From_time = request.json['TIMESTAMP_F']
        To_time = request.json['TIMESTAMP_T']
        Var = request.json['Varible']
        f = col.find({'TIMESTAMP': {
            '$gte': From_time,  # 大于等于
            "$lte": To_time}  # 小于等于
        }, {})
        result = []
        for m in f:
            result.append(m[Var])
        return jsonify({'result': result})
    except KeyError as e:
        return jsonify({'error': str(e)}), 400


@application.route('/lastest-status/<device_id>', methods=['GET'])
def lastest(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    i = col.find_one(sort=[("TIMESTAMP", -1)])
    res = {}
    for k, v in i.items():
        res[k] = v
    del res['_id']
    return jsonify({'result': res})


@application.route('/dashboard_dg/<device_id>', methods=['POST'])
def dashboarddg_fetch(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    try:
        From_time = request.json['TIMESTAMP_F']
        To_time = request.json['TIMESTAMP_T']
        Var = request.json['Varible']
    except KeyError as e:
        return jsonify({'error': "The key should be: " + str(e)}), 400
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time}  # 小于等于
    }, {})
    result = []
    try:
        x = f[0][Var]
    except KeyError:
        return jsonify({'error': "Varible not found. "}), 400
    for m in f:
        result.append(m[Var])
    return jsonify({Var: result})


# windrose 用数据
@application.route('/dashboard_wr/<device_id>', methods=['POST'])
def dashboardwr_fetch(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    try:
        From_time = request.json['TIMESTAMP_F']
        To_time = request.json['TIMESTAMP_T']
    except KeyError as e:
        return jsonify({'error': "The key should be: " + str(e)}), 400
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time}  # 小于等于
    }, {})
    dir_w = []
    spd = []
    wind_dir_n = ""
    wind_spd_n = ""  # units of wind speed
    if device_id == "000000":
        wind_dir_n = 'WindDir_resultmean'
        wind_spd_n = "WindSpd_vector_ms"
    else:
        wind_dir_n = "WD_3m_deg"
        wind_spd_n = 'WS_3m_ms'

    for m in f:
        dir_w.append(m[wind_dir_n])
        spd.append(m[wind_spd_n])
    res = [[0 for j in range(16)] for i in range(8)]
    for i in range(len(dir_w)):
        wind_level = 0
        wind_dir_t = 0
        if spd[i] <= 0.2:
            wind_level = 0
        elif spd[i] <= 1.5:
            wind_level = 1
        elif spd[i] <= 3.3:
            wind_level = 2
        elif spd[i] <= 5.4:
            wind_level = 3
        elif spd[i] <= 7.9:
            wind_level = 4
        elif spd[i] <= 10.7:
            wind_level = 5
        elif spd[i] <= 13.8:
            wind_level = 6
        elif spd[i] < 100:
            wind_level = 7

        if dir_w[i] <= 11.25:
            wind_dir_t = 0
        elif dir_w[i] <= 33.75:
            wind_dir_t = 1
        elif dir_w[i] <= 56.25:
            wind_dir_t = 2
        elif dir_w[i] <= 78.75:
            wind_dir_t = 3
        elif dir_w[i] <= 101.25:
            wind_dir_t = 4
        elif dir_w[i] <= 123.75:
            wind_dir_t = 5
        elif dir_w[i] <= 146.25:
            wind_dir_t = 6
        elif dir_w[i] <= 168.75:
            wind_dir_t = 7
        elif dir_w[i] <= 191.25:
            wind_dir_t = 8
        elif dir_w[i] <= 213.75:
            wind_dir_t = 9
        elif dir_w[i] <= 236.25:
            wind_dir_t = 10
        elif dir_w[i] <= 258.75:
            wind_dir_t = 11
        elif dir_w[i] <= 281.25:
            wind_dir_t = 12
        elif dir_w[i] <= 303.75:
            wind_dir_t = 13
        elif dir_w[i] <= 326.25:
            wind_dir_t = 14
        elif dir_w[i] <= 348.75:
            wind_dir_t = 15
        else:
            wind_dir_t = 0
        res[wind_level][wind_dir_t] += 1
    return jsonify({"res": res})


# line chart数据
@application.route('/dashboard_line_xy/<device_id>', methods=['POST'])
def dashboardline_xy(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    try:
        From_time = request.json['TIMESTAMP_F']
        To_time = request.json['TIMESTAMP_T']
        Var = request.json['Varible']
    except KeyError as e:
        return jsonify({'error': "The key should be: " + str(e)}), 400
    # for i in range(10):
    #     if col.find_one({"TIMESTAMP": int(From_time) - i * 100}) is not None:
    #         F_t = From_time - i * 100
    #         break
    #     if i == 4:
    #         return jsonify({"result": "From time not found"}), 404
    # for n in range(10):
    #     if col.find_one({"TIMESTAMP": int(To_time) + n * 100}) is not None:
    #         T_t = To_time + n * 100
    #         break
    #     if n == 4:
    #         return jsonify({"result": "To time not found"}), 404
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time}  # 小于等于
    }, {})
    result_T = []
    result_v = []
    for m in f:
        result_v.append(m[Var])
        date_str = str(m["TIMESTAMP"])
        date_obj = datetime.strptime(date_str, "%Y%m%d%H%M")
        date_formatted = date_obj.strftime("%Y-%m-%d %H:%M")
        result_T.append(date_formatted)
        result_T.append(date_str)
    u = get_device_info(device_id)
    d = dict(u.json['result'])
    unit = d[Var]
    try:
        Min_v = min(result_v)
        Max_v = max(result_v)
        Avg_v = statistics.mean(result_v)
        std_dev = statistics.stdev(result_v)
    except ValueError as e:
        return jsonify({"x": [],"y": []}), 400
        # return jsonify({"x": result_T, "y": result_v, "var": Var, "unit": unit}), 200
        
    return jsonify({"x": result_T, "y": result_v, "var": Var, "unit": unit, "average": Avg_v, "min": Min_v, "max": Max_v, "standard devision": std_dev})


# @application.route('/insert_doc/<device_id>', methods=['POST'])
# def log_insert():
#     Auth_db = application.MongoClient["Auth"]
#     col_b = Auth_db["Bearer_Token"]
#     token = request.headers.get('Authorization')
#     if not token:
#         return jsonify({'error': "Bearer Token needed"}), 400
#     token_t = token[0:6]
#     if token_t != "Bearer":
#         return jsonify({"result": "log insert failed: wrong auth type, must be Bearer."}), 401
#     Bea_t = token[7:]
#     if col_b.find_one({"PW": int(Bea_t)}) is None:
#         return jsonify({"result": "log insert failed: wrong auth, Bear not found"}), 401
#     Auth_db = application.MongoClient["Log"]
#     col_b = Auth_db["User_Download_Log"]
#     try:
#         U_name = request.json['USERNAME']
#         U_name = sql_filter(U_name)
#         request_type = request.json['Request_type']
#         request_type = sql_filter(request_type)
#         R_body = request.json['REQUESTBODY']
#     except KeyError:
#         return jsonify({'error': 'wrong varible names or wrong varible order'})
#     timt_c = datetime.now()
#     time_c = format(timt_c, '%Y-%m-%d %H:%M:%S')
#     col_b.insert_one({
#         "USERNAME": U_name,
#         "TIME": time_c,
#         'Request_type': request_type,
#         "REQUESTBODY": R_body
#     })
#     return jsonify({"result": "Log inserted successful"})


# histogram 数据生成
@application.route('/dashboard_hg/<device_id>', methods=['POST'])
def histogram(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    try:
        From_time = request.json['TIMESTAMP_F']
        To_time = request.json['TIMESTAMP_T']
        Var = request.json['Varible']
    except KeyError as e:
        return jsonify({'error': "The key should be: " + str(e)}), 400
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time}  # 小于等于
    }, {})
# except KeyError as e:
#             return jsonify({"res": "varible does not exist in device"}), 400
    u = get_device_info(device_id)
    d = dict(u.json['result'])
    # print(d)
    try:
        unit = d[Var]
    except KeyError as e:
        return jsonify({"res": "varible does not exist in device"}), 400

    result_v = []
    for m in f:
        temp = m[Var]
        result_v.append(m[Var])

    try:
        Min_v = min(result_v)
        Max_v = max(result_v)
        Avg_v = statistics.mean(result_v)
        std_dev = statistics.stdev(result_v)
    except ValueError as e:
        return jsonify({"y": result_v, "var": Var, "unit": unit}), 200
    # range setting
    interval = Max_v - Min_v
    Range = 0
    if interval > 500:
        Range = 100
    else:
        Range = 10
    bottom = math.floor(Min_v / Range) * Range
    ceiling = math.ceil(Max_v/Range) * Range

    Bar_Num = (ceiling - bottom) / Range
    Bar_Num = int(Bar_Num)
    res = []
    res_x = []
    t = bottom
    for i in range(Bar_Num):
        res.append(0)
        res_x.append(str(t)+unit + " - " + str(t + Range)+unit)
        t += Range

    for m in result_v:
        temp = bottom
        for n in range(Bar_Num):
            if temp < m <= temp+Range:
                res[n] += 1
                break
            temp += Range
    return jsonify({"x": res_x, "y": res, "var": Var, "unit": unit, "average": Avg_v, "min": Min_v, "max": Max_v, "standard devision": std_dev})


def try_int(value):
    try:
        return int(value)
    except ValueError:
        return value


@application.route('/insert_doc/<device_id>', methods=['POST'])
def dco_insert(device_id):
    Auth_db = application.MongoClient["Auth"]
    col_b = Auth_db["Bearer_Token"]
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': "Bearer Token needed"}), 400
    token_t = token[0:6]
    if token_t != "Bearer":
        return jsonify({"result": "log insert failed: wrong auth type, must be Bearer."}), 401
    Bea_t = token[7:]
    if col_b.find_one({"PW": int(Bea_t)}) is None:
        return jsonify({"result": "log insert failed: wrong auth, Bear not found"}), 401

    u = get_device_info(device_id)
    d = dict(u.json['result'])
    List_T = d["List_V"]

    Auth_db = application.MongoClient["Device_Data"]
    col_b = Auth_db[device_id]
    try:
        R_body = request.json['csv']
    except KeyError:
        return jsonify({'error': 'wrong varible names or wrong varible order'}), 400

    csv_file = StringIO(R_body)
    # Read the CSV data using the csv module
    csv_reader = csv.DictReader(csv_file)
    # Check if the keys match
    header_keys = csv_reader.fieldnames
    if header_keys != List_T:
        return jsonify({"err": "Wrong keys or keys order"})
    # Convert the CSV data to a list of dictionaries
    data_list = [{k: try_int(v) for k, v in row.items()} for row in csv_reader]
    # Convert the list of dictionaries to JSON
    # json_data = json.dumps(data_list)
    col_b.insert_many(data_list)
    return jsonify({"result": "inserted successful"}) 


# 测试
if __name__ == "__main__":
    application.run(debug=True, port=7000)
