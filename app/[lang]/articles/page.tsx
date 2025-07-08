import IArticlesPageProps, {
  EArticlesPageSearchParamsKeys,
} from "@/types/IArticlesPageProps";
import CategoryFilterCard from "../ui/shared/category-filter-card";
import PageContainer from "../ui/shared/page-container";
import { getDictionary } from "../dictionaries";
import { ICategories } from "@/types/ICategories";
import { headers } from "next/headers";
import { constructNewUrl, createURLSearchParams } from "@/lib/utils";
import { redirect } from "next/navigation";

const languagesAndFrameworks: ICategories = {
  JavaScript: {
    numberOfElements: 1,
    id: "js",
    childCategories: {
      React: {
        numberOfElements: 5,
        id: "react",
        childCategories: {
          "Next.js": {
            numberOfElements: 3,
            id: "nextjs",
            childCategories: {},
          },
          Gatsby: {
            numberOfElements: 2,
            id: "gatsby",
            childCategories: {},
          },
          "Create React App": {
            numberOfElements: 4,
            id: "cra",
            childCategories: {},
          },
        },
      },
      "Vue.js": {
        numberOfElements: 4,
        id: "vue",
        childCategories: {
          "Nuxt.js": {
            numberOfElements: 2,
            id: "nuxt",
            childCategories: {},
          },
          Quasar: {
            numberOfElements: 1,
            id: "quasar",
            childCategories: {},
          },
        },
      },
      Angular: {
        numberOfElements: 3,
        id: "angular",
        childCategories: {
          Ionic: {
            numberOfElements: 2,
            id: "ionic",
            childCategories: {},
          },
        },
      },
      "Node.js": {
        numberOfElements: 6,
        id: "nodejs",
        childCategories: {
          "Express.js": {
            numberOfElements: 8,
            id: "express",
            childCategories: {},
          },
          NestJS: {
            numberOfElements: 3,
            id: "nestjs",
            childCategories: {},
          },
          "Koa.js": {
            numberOfElements: 2,
            id: "koa",
            childCategories: {},
          },
        },
      },
    },
  },
  Python: {
    numberOfElements: 1,
    id: "python",
    childCategories: {
      Django: {
        numberOfElements: 7,
        id: "django",
        childCategories: {
          "Django REST framework": {
            numberOfElements: 4,
            id: "django-rest",
            childCategories: {},
          },
        },
      },
      Flask: {
        numberOfElements: 5,
        id: "flask",
        childCategories: {
          "Flask-RESTful": {
            numberOfElements: 2,
            id: "flask-restful",
            childCategories: {},
          },
        },
      },
      FastAPI: {
        numberOfElements: 6,
        id: "fastapi",
        childCategories: {},
      },
      Streamlit: {
        numberOfElements: 3,
        id: "streamlit",
        childCategories: {},
      },
    },
  },
  Java: {
    numberOfElements: 1,
    id: "java",
    childCategories: {
      Spring: {
        numberOfElements: 8,
        id: "spring",
        childCategories: {
          "Spring Boot": {
            numberOfElements: 12,
            id: "spring-boot",
            childCategories: {},
          },
          "Spring Security": {
            numberOfElements: 5,
            id: "spring-security",
            childCategories: {},
          },
        },
      },
      Hibernate: {
        numberOfElements: 4,
        id: "hibernate",
        childCategories: {},
      },
      "Apache Struts": {
        numberOfElements: 2,
        id: "struts",
        childCategories: {},
      },
    },
  },
  "C#": {
    numberOfElements: 1,
    id: "csharp",
    childCategories: {
      ".NET Core": {
        numberOfElements: 9,
        id: "dotnet-core",
        childCategories: {
          "ASP.NET Core": {
            numberOfElements: 7,
            id: "aspnet-core",
            childCategories: {},
          },
          "Entity Framework": {
            numberOfElements: 5,
            id: "entity-framework",
            childCategories: {},
          },
        },
      },
      Xamarin: {
        numberOfElements: 3,
        id: "xamarin",
        childCategories: {},
      },
    },
  },
  PHP: {
    numberOfElements: 1,
    id: "php",
    childCategories: {
      Laravel: {
        numberOfElements: 8,
        id: "laravel",
        childCategories: {
          Livewire: {
            numberOfElements: 2,
            id: "livewire",
            childCategories: {},
          },
        },
      },
      Symfony: {
        numberOfElements: 6,
        id: "symfony",
        childCategories: {},
      },
      CodeIgniter: {
        numberOfElements: 3,
        id: "codeigniter",
        childCategories: {},
      },
    },
  },
  Ruby: {
    numberOfElements: 1,
    id: "ruby",
    childCategories: {
      "Ruby on Rails": {
        numberOfElements: 7,
        id: "rails",
        childCategories: {
          Devise: {
            numberOfElements: 3,
            id: "devise",
            childCategories: {},
          },
        },
      },
      Sinatra: {
        numberOfElements: 2,
        id: "sinatra",
        childCategories: {},
      },
    },
  },
  Go: {
    numberOfElements: 1,
    id: "go",
    childCategories: {
      Gin: {
        numberOfElements: 4,
        id: "gin",
        childCategories: {},
      },
      Echo: {
        numberOfElements: 3,
        id: "echo",
        childCategories: {},
      },
      Fiber: {
        numberOfElements: 2,
        id: "fiber",
        childCategories: {},
      },
    },
  },
  Rust: {
    numberOfElements: 1,
    id: "rust",
    childCategories: {
      Actix: {
        numberOfElements: 3,
        id: "actix",
        childCategories: {},
      },
      Rocket: {
        numberOfElements: 2,
        id: "rocket",
        childCategories: {},
      },
      Warp: {
        numberOfElements: 1,
        id: "warp",
        childCategories: {},
      },
    },
  },
};

const ArticlesPage = async ({ params, searchParams }: IArticlesPageProps) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const awaitedSearchParams = await searchParams;
  const filters =
    typeof awaitedSearchParams.f === "string"
      ? [awaitedSearchParams.f]
      : awaitedSearchParams.f === undefined
        ? []
        : awaitedSearchParams.f;
  const expanded =
    typeof awaitedSearchParams.e === "string"
      ? [awaitedSearchParams.e]
      : awaitedSearchParams.e === undefined
        ? []
        : awaitedSearchParams.e;
  const dict = await getDictionary(lang);
  const categoryFilterCardDict = dict.shared.CategoryFilterCardDict;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  if (!pathname) {
    throw new Error("No pathname found in headers");
  }

  const setFilters = async (ids: string[]) => {
    "use server";
    const urlSearchParams = createURLSearchParams(awaitedSearchParams);
    const newUrl = constructNewUrl(
      EArticlesPageSearchParamsKeys.FILTERS,
      ids,
      pathname,
      urlSearchParams
    );
    redirect(newUrl);
  };

  const setExpanded = async (ids: string[]) => {
    "use server";
    const urlSearchParams = createURLSearchParams(awaitedSearchParams);
    const newUrl = constructNewUrl(
      EArticlesPageSearchParamsKeys.EXPANDED,
      ids,
      pathname,
      urlSearchParams
    );
    redirect(newUrl);
  };

  return (
    <PageContainer className="flex grow justify-center">
      <CategoryFilterCard
        categoryFilterCardDict={categoryFilterCardDict}
        categories={languagesAndFrameworks}
        value={filters}
        setValue={setFilters}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    </PageContainer>
  );
};

export default ArticlesPage;
