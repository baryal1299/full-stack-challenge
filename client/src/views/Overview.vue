<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Account Balances</v-list-item-title>
            <BalancePieChart :balances="balances"></BalancePieChart>
      </v-list-item-content>
      </v-list-item>
     </v-card>
    </v-col>
    <v-col>
      <v-card class="mx-auto" outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Credit Scores</v-list-item-title>
            <CreditScorePieChart :creditScores="creditScores"></CreditScorePieChart>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AccountDataService from '../services/AccountDataService';
  import CreditScorePieChart from '@/components/CreditScorePieChart.vue';
  import BalancePieChart from '@/components/BalancePieChart.vue';

  @Component({
    components: {
      CreditScorePieChart,
      BalancePieChart
    }
  })
  export default class Overview extends Vue {
    private accounts: any[] = [];
    private creditScores: number[] = [];
    private balances: number[] = [];

    fetchAccounts(){
      AccountDataService.getAllAccounts()
              .then((response) => {
                this.accounts = response.data;
                this.creditScores = this.accounts.map((item: any) => { return item.credit });
                this.balances = this.accounts.map((item: any) => { return item.balance });
              })
              .catch((e) => {
                console.error(e)
              })
    }

    mounted(): void {
      this.fetchAccounts()
    }

  }
</script>