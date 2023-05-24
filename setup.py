import setuptools
import os
import os


requires = """
"""


def get_requirements():
    ret = [x for x in requires.split("\n") if len(x) > 0]
    print("requirements:", ret)
    return ret


# path = os.path.dirname(os.path.abspath(__file__))
# requires =  get_requirements(path)

with open("README.md", "r") as f:
    setuptools.setup(
        name="agentverse",
        version="0.0.1",
        description="rovides a flexible framework that simplifies the process of building custom multi-agent environments for large language models (LLMs).",
        long_description=open("README.md", "r", encoding="utf-8").read(),
        long_description_content_type="text/markdown",
        author="",
        author_email="",
        license="Apache",
        url="",
        keywords=["Agent", "WestWord"],
        python_requires="~=3.8",
        install_requires=get_requirements(),
        package_dir={"agentverse": "agentverse"},
        package_data={},
        include_package_data=True,
        packages=setuptools.find_packages(),
        classifiers=[
            "Programming Language :: Python :: 3",
            "Programming Language :: Python :: 3.8",
            "Intended Audience :: Developers",
            "Intended Audience :: Education",
            "Intended Audience :: Science/Research",
            "License :: OSI Approved :: Apache Software License",
            "Operating System :: OS Independent",
        ],
    )
