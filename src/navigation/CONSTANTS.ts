import { lazy, LazyExoticComponent } from "react";

export const ROOT = "/";
export const HOME = "/home";

export type TPath = {
	path: string;
	exact: boolean;
	element: LazyExoticComponent<() => JSX.Element>;
	isPrivate?: boolean;
	disableGutters?: boolean;
};

export const paths: TPath[] = [
	{
		path: "/login",
		exact: true,
		element: lazy(() => import("../pages/login")),
		isPrivate: false,
	},
	// CLIENTE
	{
		path: "/clientes",
		exact: true,
		element: lazy(() => import("../pages/home")),
	},
	{
		path: "/cliente/editar/:id",
		exact: true,
		element: lazy(() => import("../pages/home/customer-edit")),
	},
	{
		path: "/cliente/criar",
		exact: true,
		element: lazy(() => import("../pages/home/customer-create")),
	},
	{
		path: "/cliente/anuencia/:customerId/:personProfileId",
		exact: true,
		element: lazy(() => import("../pages/home/customer-consent")),
	},
	{
		path: "/cliente/car/:customerId/:profileId",
		exact: true,
		element: lazy(() => import("../pages/home/customer-car")),
	},
	{
		path: "/cliente/resumo/:profileId",
		exact: true,
		element: lazy(() => import("../pages/profile-summary")),
	},
	// PEDIDOS
	{
		path: "/pedidos",
		exact: true,
		element: lazy(() => import("../pages/operation-request")),
	},
	{
		path: "/pedido/criar",
		exact: true,
		element: lazy(() => import("../pages/request")),
	},
	// CONSULTAS
	{
		path: "/consultas",
		exact: true,
		element: lazy(() => import("../pages/consultation")),
	},
	// TOMADOR
	{
		path: "/tomador/registro/:profileId",
		exact: true,
		element: lazy(() => import("../pages/risk-profile/registration")),
	},
	{
		path: "/tomador/pedidos/:profileId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/operation")),
	},
	// DOCUMENTOS
	{
		path: "/tomador/documentos/:profileId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/documents")),
	},
	{
		path: "/tomador/documentos/:profileId/:folderId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/documents")),
	},
	// CONSULTAS
	{
		path: "/consultas/credito/:profileId",
		exact: true,
		element: lazy(() => import("../pages/risk-profile/credit")),
	},
	{
		path: "/consultas/compliance/:profileId",
		exact: true,
		element: lazy(() => import("../pages/risk-profile/compliance")),
	},
	// CONSULTAS JUDICIAIS
	{
		path: "/consultas/processos/:profileId",
		exact: true,
		element: lazy(() => import("../pages/lawsuits")),
	},
	{
		path: "/consultas/processos/detalhes/:lawsuitId",
		exact: true,
		element: lazy(() => import("../pages/lawsuits/pages/details/LawsuitDetailsContainer")),
	},
	// PROTESTOS
	{
		path: "/consultas/protestos/:profileId",
		exact: true,
		element: lazy(() => import("../pages/risk-profile/protests")),
	},
	{
		path: "/consultas/sintegra/detalhes/:producerId",
		exact: true,
		element: lazy(() => import("../pages/risk-profile/producer/detail")),
	},
	{
		path: "/consultas/sintegra/:profileId",
		exact: true,
		element: lazy(() => import("../pages/risk-profile/producer")),
	},
	// PATRIMÔNIO
	{
		path: "/patrimonio/propriedades/:profileId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/properties")),
	},
	{
		path: "/patrimonio/irpf/:profileId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/irpf")),
	},
	{
		path: "/patrimonio/irpf/detalhe/:irpfId",
		exact: true,
		element: lazy(() => import("../pages/irpf-detail")),
	},
	{
		path: "/patrimonio/irpf/detalhe/:irpfId/:item",
		exact: true,
		element: lazy(() => import("../pages/irpf-detail")),
	},
	// {
	// 	path: "/patrimonio/irpf/detalhe/:irpfId/bens-direitos",
	// 	exact: true,
	// 	element: lazy(() => import("../pages/irpf-detail/components/assets-detail")),
	// },
	// {
	// 	path: "/patrimonio/irpf/detalhe/:irpfId/dividas",
	// 	exact: true,
	// 	element: lazy(() => import("../pages/irpf-detail/components/debts-detail")),
	// },
	// {
	// 	path: "/patrimonio/irpf/detalhe/:irpfId/atividade-agricola",
	// 	exact: true,
	// 	element: lazy(() => import("../pages/irpf-detail/components/agricultural-activity")),
	// },
	// DETALHES PROPRIEDADES START
	{
		path: "/propriedade/detalhe/:propertyId",
		exact: true,
		element: lazy(() => import("../pages/property-detail")),
	},
	{
		path: "/propriedade/detalhe/:tabItem/:propertyId",
		exact: true,
		element: lazy(() => import("../pages/property-detail")),
	},
	{
		path: "/propriedade/add-propriedade/:profileId",
		exact: true,
		element: lazy(() => import("../pages/property-add")),
	},
	{
		path: "/propriedade/add-propriedade/:profileId/:propertyId",
		exact: true,
		element: lazy(() => import("../pages/property-add")),
	},
	// DETALHES PROPRIEDADES END
	{
		path: "/patrimonio/armazens/:profileId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/storage-facilities")),
	},
	// FLUXO DE CAIXA
	{
		path: "/fluxo-caixa/safras/:profileId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/season")),
	},
	// DETALHES SAFRA START
	{
		path: "/safra/detalhe/:seasonId",
		exact: true,
		element: lazy(() => import("../pages/season-detail")),
	},
	{
		path: "/safra/detalhe/:tabItem/:seasonId",
		exact: true,
		element: lazy(() => import("../pages/season-detail")),
	},
	// DETALHES SAFRA END
	{
		path: "/fluxo-caixa/financeiro/:profileId",
		exact: true,
		element: lazy(() => import("../pages/indebtedness/scr")),
	},
	{
		path: "/fluxo-caixa/endividamento-cpr/:profileId",
		exact: true,
		element: lazy(() => import("../pages/productive-profile/obligations")),
	},
	// ANÁLISE OPERACIONAL
	{
		path: "/analise-operacional/zarc/:profileId",
		exact: true,
		element: lazy(() => import("../pages/operational/zarc")),
	},
	// PESSOAS RELACIONADAS
	{
		path: "/tomador/grupos-relacionados/:profileId",
		exact: true,
		element: lazy(() => import("../pages/risk-profile/related-group")),
	},
	// OTHERS
	{
		path: "/error",
		exact: true,
		element: lazy(() => import("../pages/hub-error/error")),
	},
	{
		path: "/forbidden",
		exact: true,
		element: lazy(() => import("../pages/hub-error/forbidden")),
	},
	{
		path: "/not-found",
		exact: true,
		element: lazy(() => import("../pages/hub-error/not-found")),
	},
	// ANTIGOS LINKS PARA COMPATIBILIDADE CASO USUÁRIO TENTAR ACESSAR ELES AINDA
	{
		path: "/perfil-produtivo/propriedade/detalhe/:propertyId",
		exact: true,
		element: lazy(() => import("../pages/property-detail")),
	},
	{
		path: "/perfil-produtivo/propriedade/detalhe/:tabItem/:propertyId",
		exact: true,
		element: lazy(() => import("../pages/property-detail")),
	},
	{
		path: "/safras/detalhe/:seasonId",
		exact: true,
		element: lazy(() => import("../pages/season-detail")),
	},
	{
		path: "/safras/detalhe/:tabItem/:seasonId",
		exact: true,
		element: lazy(() => import("../pages/season-detail")),
	},
];
