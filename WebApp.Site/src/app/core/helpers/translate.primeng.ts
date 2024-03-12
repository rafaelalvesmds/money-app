import { PrimeNGConfig } from 'primeng/api';

export class TranslatePrimeng {
  public config(config: PrimeNGConfig): void {
    config.ripple = true;

    config.setTranslation({
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      today: 'Hoje',
      weekHeader: 'Semana',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum registro encontrado com o filtro informado',
      weak: 'Fraca',
      medium: 'Média',
      strong: 'Forte',
      passwordPrompt: 'Informe a senha',
      clear: 'Limpar',
      apply: 'Aplicar'
    });
  }
}
