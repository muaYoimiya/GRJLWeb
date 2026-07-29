from fastapi import FastAPI# FastAPI 框架核心类
from pydantic import BaseModel# 数据验证和序列化工具

# 创建应用实例
app = FastAPI()

# 模拟数据（内存存储）
# 服务重启数据就丢了，实际项目会用真实数据库。
profile = {
    "heroTitle": "关于我",
    "heroSubtitle": "项目，创意，灵感，心得，我的作品",
}

# 用 Pydantic 定义 POST 请求的数据格式：
class AnalyzeRequest(BaseModel):
    #客户端必须传一个 JSON：{"text": "..."}
    text: str
# 如果传错类型(如数字),FastAPI 自动返回 422错误


# GET 接口：获取个人资料
@app.get("/api/profile")
def get_profile():
    return profile

#POST 接口：分析文本（模拟）
@app.post("/api/analyze")
def analyze(req: AnalyzeRequest):
    return {
        "text": req.text,
        "score": 0.5,
        "label": "偏平静",
        "pinyin": "（模块 6 再说）",
    }
