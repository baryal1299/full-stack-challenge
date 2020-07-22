<template>
    <v-container>
        <v-row>

            <v-col
                    v-for="(account, i) in accounts"
                    :key="i"
                    cols="xs-12"
                    class="mx-auto sm-12"
            >
                <v-lazy
                        :options="{
                              threshold: .5
                            }"
                        min-height="200"
                        transition="fade-transition"
                >
                    <v-card
                            :loading="loading"
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                        class="headline"
                                        v-text="account.name_first + ' ' + account.name_last"
                                ></v-card-title>
                                <v-card-subtitle>
                                    <span
                                            v-for="(tag, i) in account.tags"
                                            :key="i"
                                            class="tag"
                                    >
                                        {{tag.name}}
                                    </span>
                                </v-card-subtitle>
                                <v-card-text>
                                    <p><label>Address:</label> {{account.address}}</p>
                                    <p><label>Employer:</label> {{account.employer}}</p>
                                    <p><label>Credit Score:</label> {{account.credit}}</p>
                                    <p><label>Account Balance:</label> {{account.balance|usd}}</p>
                                </v-card-text>
                            </div>

                            <v-avatar
                                    class="ma-3"
                                    size="125"
                                    tile
                            >
                                <v-img :src="account.picture"></v-img>
                            </v-avatar>
                        </div>
                        <v-progress-linear
                                :value="mortgageIndicator(account)"
                                height="25"
                                color="green"
                        >
                            <strong>{{ Math.ceil(mortgageIndicator(account)) }}%</strong>
                        </v-progress-linear>
                        <v-card-actions>
                            <v-btn class="ma-2" tile text color="primary">
                                <v-icon left small>mdi-email</v-icon>
                                <span class="hidden-sm-and-down">{{account.email}}</span>
                            </v-btn>
                            <v-btn class="ma-2" tile text color="primary">
                                <v-icon left small>mdi-phone</v-icon>
                                <span class="hidden-sm-and-down"> {{account.phone | phoneNumber }}</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-lazy>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import AccountDataService from '../services/AccountDataService';

    @Component({
        filters: {
            phoneNumber(value: string) {
                return value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            },
            usd(value: number) {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                });
                return formatter.format(value);
            }

        }
    })
    export default class AccountsList extends Vue {
        private accounts = [];
        private requiredCreditScore = 620;
        private requiredDownPayment = 20000;
        private loading = false;

        fetchAccounts() {
            AccountDataService.getAllAccounts()
                .then((response) => {
                    this.accounts = response.data;
                })
                .catch((e) => {
                    console.error(e)
                })
        }

        mortgageIndicator(account: any): number {
            const credit = (account.credit / this.requiredCreditScore) * 100;
            const downPayment = (account.balance / this.requiredDownPayment) * 100;
            return (credit * 0.40 + downPayment * 0.60) / 2;
        }

        mounted(): void {
            this.fetchAccounts();
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h1 {
        color: red;
    }

    .tag {
        color: orange;
    }
</style>
