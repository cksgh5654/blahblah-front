import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import CameraIcon from "@components/Icons/CameraIcon";
import TrashIcon from "@components/Icons/TrashIcon";
import BaseButton from "@components/Button/BaseButton";
import { fetchCategories } from "@apis/category.api";
import { imageUpload } from "@config/aws.config";
import { urlRegex } from "../regex/regex";
import { useNavigate } from "react-router-dom";

interface boardInfo {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  memberCount: number;
  postCount: number;
}

interface Category {
  _id: string;
  name: string;
}

const CreateBoardPage = () => {
  const navigate = useNavigate();
  const [nameCount, setNameCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [urlCount, setUrlCount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [img, setImg] = useState<File | null>(null);
  const [isCheckedPrivacyPolicy, setIsCheckedPrivacyPolicy] = useState(false);
  const [isCheckedOperatingPrinciples, setIsCheckedOperatingPrinciples] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boardInfo, setBoardInfo] = useState<boardInfo>({
    name: "",
    description: "",
    image: "",
    url: "",
    category: "",
    memberCount: 0,
    postCount: 0,
  });

  const isLogin = localStorage.getItem("signinStatus");

  useEffect(() => {
    if (isLogin === "false") {
      alert("로그인 후 이용해주세요");
      navigate("/");
    }
  }, [isLogin, navigate]);

  const fetchCategoryOption = async () => {
    try {
      const categorieOption = await fetchCategories();
      setCategories(categorieOption);
      setBoardInfo((prev) => ({
        ...prev,
        category: categorieOption[0]?.name || "",
      }));
    } catch (error) {
      console.error("카테고리 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchCategoryOption();
  }, []);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameCount(e.target.value.length);
    setBoardInfo((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
  };

  const handleDelete = () => {
    setImg(null);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionCount(e.target.value.length);
    setBoardInfo((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlCount(e.target.value.length);
    if (!urlRegex.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^A-Za-z0-9_]/g, "");
    }
    setBoardInfo((prev) => ({
      ...prev,
      url: e.target.value,
    }));
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setBoardInfo((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const FileUpload = async (file: File) => {
    try {
      const image = await imageUpload(file);
      setBoardInfo((prev) => ({
        ...prev,
        image,
      }));
      return image;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleClickSubmit = async () => {
    setIsLoading(true);

    if (!isCheckedPrivacyPolicy) {
      alert("게시판 개인정보보호정책에 동의해주세요");
      setIsLoading(false);
      return;
    }
    if (!isCheckedOperatingPrinciples) {
      alert("게시판 운영원칙에 동의해주세요");
      setIsLoading(false);
      return;
    }

    let imgUrl: string | undefined = "";
    if (img) {
      imgUrl = await FileUpload(img);
    }

    try {
      const response = await axios.post("/api/board/submit", {
        ...boardInfo,
        image: imgUrl,
      });
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log("handleClickSubmit 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center">
      <main className="w-[1280px] px-8 py-16 flex gap-6 flex-col">
        <div>
          <div className="flex justify-end items-center">
            <p className=" text-sm text-slate-500">{nameCount}/20</p>
          </div>
          <input
            onChange={handleChangeName}
            type="text"
            placeholder="게시판 이름을 입력해주세요."
            name="name"
            id="name"
            maxLength={20}
            required
            className="border-b-2 w-full h-10 border-slate-300 text-2xl focus:outline-none focus:border-violet-800 placeholder:text-2xl placeholder:text-slate-300"
          />
        </div>
        <section className="grid grid-cols-[1fr_2fr] gap-6">
          {img ? (
            <div onClick={handleDelete} className="relative">
              <div className="absolute inset-0 flex items-center justify-center bg-rose-200 bg-opacity-70 opacity-0 rounded-md hover:opacity-100 transition-opacity">
                <TrashIcon width={"40px"} className="text-red-900" />
              </div>
              <img
                src={URL.createObjectURL(img)}
                className="h-52 w-full object-cover border rounded-md border-slate-200 transition-opacity hover:opacity-25"
              />
            </div>
          ) : (
            <div className="flex h-52 justify-center items-center rounded-md bg-slate-100">
              <label
                htmlFor="img"
                className=" py-2 px-4 mb-2 rounded-md cursor-pointer text-slate-500 group"
              >
                <CameraIcon className="group-hover:fill-violet-800 duration-300" />
                <span className="group-hover:text-violet-800 duration-300">
                  대표 사진 추가
                </span>
              </label>
              <input
                onChange={handleChangeImg}
                type="file"
                name="img"
                id="img"
                className="hidden"
                accept="image/*"
              />
            </div>
          )}
          <div>
            <div className="flex justify-between pb-1">
              <label htmlFor="description" className="text-lg">
                게시판 설명
              </label>
              <p className="text-sm text-slate-500">{descriptionCount}/200</p>
            </div>
            <textarea
              onChange={handleChangeDescription}
              style={{ resize: "none" }}
              placeholder="게시판 설명을 입력해주세요."
              id=" description"
              maxLength={200}
              className="w-full h-[calc(100%-32px)] px-2 py-3 text-sm border border-slate-300 rounded-lg outline-violet-800"
            />
          </div>
        </section>
        <hr className="border-slate-300" />
        <section className="flex items-center w-full">
          <label htmlFor="url" className="pl-4 pr-8 text-nowrap text-lg">
            주소
          </label>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center w-full">
              <p className="pr-2">http://localhost:5173/board/</p>
              <input
                onChange={handleChangeUrl}
                type="text"
                id="url"
                className="w-full px-2 py-3 text-sm border border-slate-300 rounded-lg outline-violet-800"
                placeholder="나머지 주소를 입력해주세요."
                maxLength={20}
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-red-400">
                주소는 생성 이후 수정이 불가능합니다. &#40;알파벳, 숫자,
                언더바만 입력 가능&#41;
              </p>
              <p className="text-sm text-slate-500">{urlCount}/20</p>
            </div>
          </div>
        </section>
        <hr className="border-slate-300" />
        <section className="flex items-center w-full">
          <label htmlFor="address" className="pl-4 pr-8 text-nowrap text-lg">
            카테고리
          </label>
          <select
            onChange={handleChangeCategory}
            className="w-full px-2 py-3 text-sm border border-slate-300 rounded-lg outline-violet-800"
          >
            {categories.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </section>
        <hr className="border-slate-300" />
        <section className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                onChange={(e) => setIsCheckedPrivacyPolicy(e.target.checked)}
                type="checkbox"
                id="privacy-policy"
                className="cursor-pointer"
              />
              <label htmlFor="privacy-policy" className="cursor-pointer">
                게시판 개인정보보호정책에 동의합니다.
              </label>
            </div>
            <div className="bg-slate-100 h-48 px-2 py-4 text-sm text-slate-600 overflow-scroll">
              <p>
                ※ '게시판 매니저'라 함은 미니 게시판 서비스 내 각 미니 갤러리의
                모든 운영권한을 갖는 '매니저'를 말합니다.
              </p>
              <p>
                게시판 매니저는 불필요한 개인정보를 수집하거나 처리하지 않도록
                하며, 관련 법령 및 약관을 준수합니다.
              </p>
              <dl>
                <dt className="pt-1">
                  1. 부정한 목적으로의 개인정보 처리 금지
                </dt>
                <dd>
                  금전적 이득 등을 위하여 부정한 목적으로 개인정보를 수집하거나
                  매매 등을 이용한 우회적인 개인정보 부정 판매 등이 적발될 경우,
                  블라블라는 관련 법령과 사이트 이용약관 및 게시판 운영원칙 등에
                  따라 해당 게시판에 대한 제재, 그리고 관련 법령에 따른
                  민형사상의 책임을 물을 수 있습니다.
                </dd>

                <dt className="pt-1">
                  2. 불필요한 개인정보에 대한 수집 및 이용 금지
                </dt>
                <dd>
                  불필요한 개인정보에 대한 수집, 이용을 해서는 안되며,
                  불가피하게 개인정보를 수집해야 하는 경우 최소한의 개인정보에
                  한해야 합니다. 또한, 관련 법령 및 이용약관, 운영원칙에
                  위배되지 않음을 합리적으로 증명할 수 있어야 합니다.
                </dd>

                <dt className="pt-1">3. 개인정보의 수집 시 사전동의</dt>
                <dd>
                  개개인정보를 수집하는 경우 반드시 사전에 '개인정보 항목,
                  수집목적, 보관기간, 개인정보의 수집을 거부할 권리 및 이로 인한
                  불이익'에 대해 명확히 고지하고, 정보주체(개인정보가 수집되는
                  다른 이용자)들의 개별 동의를 받아야 합니다.
                </dd>

                <dt className="pt-1">4. 개인정보 제공의 금지</dt>
                <dd>
                  개인정보를 동의를 받아 수집한 경우라도 외부(수집한 사람을
                  제외한 모든 사람)에 제공하는 것은 원칙적으로 금지됩니다. 만약
                  외부에 제공하고자 하는 경우에는 정보주체에게 ‘제공받는 자,
                  제공하는 항목, 제공목적, 이용기간’을 명확히 고지하고 사전에
                  개별 동의를 받아야 합니다.
                </dd>

                <dt className="pt-1">
                  5. 주민등록번호 등 고유식별정보의 처리 금지
                </dt>
                <dd>
                  주민등록번호는 법령에 의하여 처리 근거가 있는 경우를 제외하고
                  어떤 목적으로도 처리할 수 없으며, 여권번호, 운전면허번호,
                  외국인 등록번호도 처리할 수 없습니다. 단, 불가피하게 처리가
                  필요한 경우에 한해 정보주체에게 사전에 개별 동의를 받아야
                  합니다.
                </dd>

                <dt className="pt-1">6. 민감 정보의 처리 제한</dt>
                <dd>
                  사상/신념, 정치적 견해, 노동조합/정당의 가입/탈퇴, 건강 및
                  성생활 등에 관한 정보, 유전정보, 범죄경력’에 관한 정보는
                  법령에 의하여 처리 근거가 있는 경우를 제외하고 처리할 수
                  없습니다. 단, 불가피하게 처리가 필요한 경우, 정보 주체로부터
                  사전에 개인정보 활용 동의를 반드시 받은 후 처리를 할 수
                  있습니다.
                </dd>

                <dt className="pt-1">7. 영리 목적의 개인정보 처리 금지</dt>
                <dd>
                  상품판매, 공동구매, 수강생 모집 등 여타의 영리 목적을 목적으로
                  개인정보를 처리하는 것은 어떠한 경우에도 금지됩니다.
                </dd>
              </dl>
              <p>
                그 밖에 위에 기재하지 않은 사항은 블라블라 개인정보처리방침,
                이용약관, 게시판 서비스 운영원칙 등에서 정한 바에 의합니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                onChange={(e) =>
                  setIsCheckedOperatingPrinciples(e.target.checked)
                }
                type="checkbox"
                id="operating-principles"
                className="cursor-pointer"
              />
              <label htmlFor="operating-principles" className="cursor-pointer">
                게시판 운영원칙에 동의합니다.
              </label>
            </div>
            <div className="bg-slate-100 h-48 px-2 py-4 text-sm text-slate-600 overflow-scroll">
              <p>
                미니 갤러리 서비스는 이용자분들이 직접 만들고 운영하는 커뮤니티
                공간으로 모든 이용자들은 아래 운영원칙을 준수해야 합니다.
              </p>
              <strong>[모든 이용자가 지켜야 하는 원칙]</strong>
              <ul>
                <li>
                  모든 이용자는 미니 갤러리 주제에 맞는 정상적인 활동을 해주셔야
                  합니다.
                </li>
                <li>
                  미니 갤러리 서비스에 등록하는 모든 콘텐츠의 저작권은 게시한
                  이용자 본인에게 있으며, 이로 인해 발생되는 문제에 대해서도
                  해당 게시물을 게시한 이용자에게 책임이 있습니다.
                </li>
                <li>
                  모든 이용자는 사이트 이용약관 및 개인정보처리방침, 본
                  운영원칙을 준수해야 하며, 이를 지키지 않아 발생하는 문제에
                  대해 일체의 책임을 져야 합니다.
                </li>
              </ul>
              <strong>[매니저가 지켜야 하는 원칙]</strong>
              <ul>
                <li>
                  '매니저'란 미니 갤러리의 운영 권한을 갖는 이용자를 가리키는
                  단어입니다.
                </li>
                <li>
                  매니저는 미니 갤러리를 최초 개설하였거나, 이전 매니저로부터
                  미니 갤러리를 위임받은 이용자로서 해당 미니 갤러리를 대표하며,
                  미니 갤러리를 관리할 수 있는 모든 권한과 책임을 갖고 있습니다.{" "}
                </li>
                <li>
                  매니저는 이용약관, 운영원칙, 법령 등에 위배되는 게시물을
                  주도적으로 등록하거나 이용자들의 행동을 의도적으로 방치한
                  경우, 이에 대한 책임을 질 수 있습니다. 단, 매니저는 이용 제한
                  사유에 해당하지 않는 글(매니저에 대한 비판글 포함)의 삭제,
                  이용자 차단, 금지어 설정 등으로 이용자들의 정상적인 활동을
                  제한해서는 안 됩니다.
                </li>
                <li>
                  매니저는 미니 갤러리가 원활히 운영될 수 있도록 주기적으로 미니
                  갤러리에 방문해 성실하고 공정한 관리를 다 해야 합니다. 만약,
                  장기간(최소 30일 이상) 부재 시 다른 이용자에게 매니저의 책임과
                  권한이 이관될 수 있습니다. 부매니저는 매니저가 임명하고 이를
                  수락한 이용자로 미니 갤러리를 관리할 수 있는 일부 권한과
                  책임이 있습니다.
                </li>
              </ul>
              <strong>[이용제한 사유에 해당하는 금지 활동]</strong>

              <dl>
                <dt className="pt-1">1. 음란물 유포</dt>
                <dd>
                  외설적인 내용으로 성적 수치심과 혐오감을 유발하고 일반인의 성
                  관념에 위배되는 경우
                </dd>
                <dd>
                  남녀의 성기, 음모, 항문을 묘사하거나 성행위 등을 표현하는 경우
                </dd>
                <dd>
                  윤락행위를 알선하거나 성관계를 목적으로 하는 만남 알선 내용
                </dd>
                <dd>
                  스와핑, 동거 등 사회 윤리적으로 용납되지 않은 행위를 매개하는
                  경우
                </dd>
                <dt className="pt-1">2. 아동·청소년 대상 음란성 게시물 유포</dt>
                <dd>아동·청소년 성 착취물을 제작 및 배포하는 게시물</dd>
                <dd>
                  아동·청소년 성 착취물임을 알면서도 소지하거나 배포하는 게시물
                </dd>
                <dd>아동·청소년의 성적 대상화 게시물</dd>
                <dd>
                  아동·청소년 대상 성범죄 및 성매매를 모의하거나 묘사, 조장하는
                  게시물
                </dd>
                <dd>아동·청소년에게 음란물이나 성 착취물을 제공하는 게시물</dd>
                <dd>아동·청소년에게 성인 도구를 판매하는 게시물</dd>
                <dd>
                  아동·청소년으로 인식될 수 있는 표현물에 대한 성 착취 게시물
                </dd>
                <dd>그 외 아동·청소년 대상 성범죄 관련 게시물</dd>
                <dt className="pt-1">3. 불법적 내용 유포</dt>
                <dd>범죄 관련 내용을 미화/권유/조장하는 내용</dd>
                <dd>범죄 행위를 청탁하거나 이를 권유, 유도 및 매개하는 내용</dd>
                <dd>타인을 협박, 위협하는 게시물</dd>
                <dd>
                  여타의 범법 행위에 대한 동기 부여 및 실행에 도움이 되는 정보를
                  제공하는 내용
                </dd>
                <dd>불법제품, 통신판매가 금지된 품목에 대한 판매, 알선 행위</dd>
                <dd>
                  해킹, 악성코드, 바이러스 유포하거나 타인의 권리를 침해할 수
                  있는 불법 자료를 유포하는 내용
                </dd>
                <dd>
                  다단계 영업, 자살 권유, 불법 도박, 사행심 조장 등의 내용
                </dd>
                <dd>
                  유해약물 등의 효능 및 제조방법 등을 구체적으로 기술하여 그
                  복용 제조 및 사용을 조장하거나 이를 매개하는 내용
                </dd>
                <dt className="pt-1">
                  4. 도배, 스팸, 상업적 홍보 및 광고 활동
                </dt>
                <dd>동일한 내용을 반복적으로 등록하는 도배, 스팸 행위</dd>
                <dd>
                  상업적 목적으로 미니 갤러리를 운영하거나 게시물을 등록하는
                  행위
                </dd>
                <dd>홍보성 타 사이트 링크 포함 및 광고 게시물</dd>
                <dd>
                  (상업, 홍보 활동은 별도의 제휴를 통해 인증된 업체에 한 해 해당
                  갤러리에서만 제한적으로 허용)
                </dd>
                <dt className="pt-1">5. 명예훼손 행위</dt>
                <dd>타인에게 수치심, 혐오감, 불쾌감을 일으키는 게시물</dd>
                <dd>
                  욕설 또는 언어폭력 등의 저속한 표현으로 특정인의 인격을
                  모독하거나 불쾌감을 불러 일으키는 내용
                </dd>
                <dt className="pt-1">6. 저작권 침해 행위</dt>
                <dd>
                  권리자의 동의 없이 자료를 불법 게시, 배포, 복제하는 경우
                </dd>
                <dd>
                  저작권이 있는 소프트웨어 불법 다운로드 및 시리얼 넘버, 시디키
                  등를 공유하는 경우
                </dd>
                <dd>여타 타인의 지적재산권을 침해하는 행위</dd>
                <dt className="pt-1">7. 불법적 거래 행위</dt>
                <dd>
                  타인에게 금전적 거래로 미니 갤러리를 양도, 대여하거나 그에
                  준하는 행위
                </dd>
                <dd>타인을 기망하여 미니 갤러리를 위임받거나 탈취하는 행위</dd>
                <dt className="pt-1">8. 기타 금지 행위</dt>
                <dd>
                  미니 갤러리의 주제와 동떨어진 내용과 상식에 어긋나는 내용으로
                  지속적으로 분란을 야기하는 경우
                </dd>
                <dd>특정 단어, 문구를 반복적으로 등록하는 행위</dd>
                <dd>
                  일반적인 사람이 보기에 혐오스럽고 눈살이 찌푸려지는 사진 또는
                  내용을 작성 (인간/동물의 사체 또는 훼손된 모습,
                  방뇨/배설/살인/자살의 장면 등)
                </dd>
                <dd>차별/갈등 조장 활동</dd>
                <dd>
                  존속에 대한 상해 폭행 살인 등 전통적인 가족윤리를 훼손할
                  우려가 있는 내용
                </dd>
                <dd>
                  정상적인 활동으로 볼 수 없는 반복적인 미니 갤러리 만들기,
                  폐쇄, 위임 등의 행위
                </dd>
                <dd>
                  디시인사이드 회사 직원 또는 미니 갤러리 서비스 운영진을
                  사칭하는 행위
                </dd>
                <dd>타인의 사생활을 침해하는 게시물</dd>
                <dd>
                  타인을 사칭하여 명예를 훼손하는 게시물, 타인의 사진 및 개인
                  정보(이름, 주민번호, 연락처 등)를 무단으로 배포하는 게시물
                </dd>
                <dd>
                  ※ 본 삭제 기준에 해당하는 게시물을 등록할 경우 관련 법령에
                  의해 민, 형사상 책임을 질 수 있습니다.
                </dd>
              </dl>
              <dl>
                <dt className="pt-1">1. 게시물 제한</dt>
                <dd>
                  운영원칙에 어긋나는 게시물인 경우 타 이용자가 볼 수 없도록
                  노출이 제한됩니다.
                </dd>
                <dt className="pt-1">2. 이용자 이용 정지</dt>
                <dd>
                  운영원칙에 어긋나는 행위를 한 이용자인 경우 게시물/댓글 등록
                  및 미니 갤러리 개설 등의 활동을 할 수 없게 이용이 일시 또는
                  영구 정지됩니다.
                </dd>
                <dt className="pt-1">3. 매니저 해임</dt>
                <dd>
                  매니저의 장기간 부재 또는 본 운영원칙에 위반되는 내용의
                  게시물의 방치 등 불성실한 운영 시 매니저를 해임할 수 있습니다.
                </dd>
                <dt className="pt-1">4. 미니 갤러리 접근 제한</dt>
                <dd>
                  운영원칙에 어긋나는 행위를 방치, 조장했거나 여타의 문제가 있는
                  경우 다른 이용자가 볼 수 없도록 미니 갤러리 접근을 일시 또는
                  영구적으로 제한합니다.
                </dd>
                <dt className="pt-1">5. 미니 갤러리 폐쇄</dt>
                <dd>
                  운영원칙에 어긋나는 문제가 반복되거나 심대한 경우, 또는
                  수사기관의 요청, 불법적인 목적의 운영/개설 의도가 명확한 경우
                  해당 미니 갤러리는 폐쇄 조치됩니다.
                </dd>
              </dl>
            </div>
          </div>
        </section>
        <hr className="border-slate-300" />
        <ul className="list-disc text-sm text-gray-500">
          <li>
            게시물의 관리 의무와 권리는 매니저(개설자)에게 있으며, 운영원칙을
            위반한 경우 폐쇄 또는 매니저 해임이 될 수 있습니다.(음란물, 불량
            게시물, 상업적 게시물, 댓글의 방치 등)
          </li>
          <li>갤러리 개설은 총 6개까지 가능합니다.</li>
        </ul>
        <BaseButton onClick={handleClickSubmit} disabled={isLoading}>
          {isLoading ? "신청중입니다..." : "게시판 개설 신청"}
        </BaseButton>
      </main>
    </div>
  );
};

export default CreateBoardPage;
